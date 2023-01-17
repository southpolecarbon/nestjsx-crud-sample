import React from 'react';
import { AppProps } from 'next/app';
import { Refine } from '@pankod/refine-core';
import {
  notificationProvider,
  ReadyPage,
  ErrorComponent,
} from '@pankod/refine-antd';
import routerProvider from '@pankod/refine-nextjs-router';
import dataProvider from '@pankod/refine-nestjsx-crud';
import '@pankod/refine-antd/dist/reset.css';
import {
  Title,
  Header,
  Sider,
  Footer,
  Layout,
  OffLayoutArea,
} from '@components/layout';
import { UsersList } from './users/list';
import { EmissionFactorsList } from './emission-factors/list';
import { EmissionFactorShow } from './emission-factors/show';
import { EmissionFactorCreate } from './emission-factors/create';
import { EmissionFactorEdit } from './emission-factors/edit';

const API_URL = 'http://localhost:5004';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(API_URL)}
      notificationProvider={notificationProvider}
      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      resources={[
        {
          name: 'emissionFactors',
          list: EmissionFactorsList,
          edit: EmissionFactorEdit,
          show: EmissionFactorShow,
          create: EmissionFactorCreate,
          canDelete: true,
        },
        {
          name: 'users',
          list: UsersList,
        },
      ]}
      Title={Title}
      Header={Header}
      Sider={Sider}
      Footer={Footer}
      Layout={Layout}
      OffLayoutArea={OffLayoutArea}
    >
      <Component {...pageProps} />
    </Refine>
  );
}

export default MyApp;
