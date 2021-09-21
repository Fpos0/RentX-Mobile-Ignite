import React, { useEffect, useState } from 'react';

import { StatusBar, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync'
import { database } from '../../database';
import { Car as ModelCar } from '../../database/model/Car'
import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';



// transformando o RectButton em um componente animado

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
} from './styles';

export function Home() {
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);

  const netInfo = useNetInfo();
  const navigation = useNavigation();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api
          .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);

        const { changes, latestVersion } = response.data;

        // console.log('BACKEND PARA APP');
        // console.log(changes);

        return { changes, timestamp: latestVersion }
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post('/users/sync', user);
      },
    });
  }

  useEffect(() => {
    let isMounted = true;
    async function fetchCars() {
      try {
        const carCollection = database.get<ModelCar>('cars');
        const cars = await carCollection.query().fetch();
        // const response = await api.get('/cars');


        if (isMounted) {
          setCars(cars);
        }
      } catch (error) {
        console.log(error);

      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCars();
    return () => {
      isMounted = false;
    }
  }, []);

  // useEffect(() => {
  //   if (netInfo.isConnected) {
  //     Alert.alert('Você está online!')
  //   } else {
  //     Alert.alert('Você está off-line')
  //   }
  // }, [netInfo.isConnected])
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />

          {
            !loading &&
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          }
        </HeaderContent>
      </Header>
      <Button title="sincronizar" onPress={offlineSynchronize} />

      {loading ? <LoadAnimation /> :
        <CarList
          data={cars}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) =>
            <Car data={item} onPress={() => handleCarDetails(item)} />}
        />
      }
    </Container>
  )
}