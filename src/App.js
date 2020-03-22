import React from 'react'

// コンポ―ネントのimport
import Busho from './components/Busho'
import Tanto from './components/Tanto'
import Baibai from './components/Baibai'
import Azukari from './components/Azukari'
import Henpin from './components/Henpin'
import Shoribi from './components/Shoribi'
import Hasseibi from './components/Hasseibi'
import Furikaebi from './components/Furikaebi'
import Nissu from './components/Nissu'
import TokunoOption from './components/TokunoOption'
import Haitanto from './components/Haitanto'
import Shukkobi from './components/Shukkobi'
import Meihenbi from './components/Meihenbi'
import Tokuno from './components/Tokuno'
import Zeiku from './components/Zeiku'
import SubmitButton from './components/SubmitButton'
import Meisai from './components/Meisai'

// Material-UI関連のimport
import {
  createMuiTheme, 
  MuiThemeProvider, 
  CssBaseline, 
  Grid,
  Typography,
} from '@material-ui/core'
import { blue } from '@material-ui/core/colors'

// GraphQL関連のimport
import gql from 'graphql-tag'

// Apollo-Client関連のimport
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo-hooks'


export default function App() {

  // キャッシュ
  const cache = new InMemoryCache()

  // GraphQLのエンドポイント
  const httpLink = new HttpLink({
    uri: 'http://localhost:5000/graphql',
  })

  // Apollo-Clientの設定
  const client = new ApolloClient({
    link: httpLink,
    cache,
    resolvers: {
       Mutation: {
        changeSelectedBusho: (_root, variables, { cache }) => {
          cache.writeQuery({
            query: gql`{selectedBusho}`,
            data: {selectedBusho: variables.id},
          });
        },
        changeSelectedTanto: (_root, variables, { cache }) => {
          cache.writeQuery({
            query: gql`{selectedTanto}`,
            data: {selectedTanto: variables.id},
          });
        },
        changeSelectedBaibai: (_root, variables, { cache }) => {
          cache.writeQuery({
            query: gql`{selectedBaibai}`,
            data: {selectedBaibai: variables.id},
          });
        },
        changeSelectedAzukari: (_root, variables, { cache }) => {
          cache.writeQuery({
            query: gql`{selectedAzukari}`,
            data: {selectedAzukari: variables.id},
          });
        },
        changeSelectedHenpin: (_root, variables, { cache }) => {
          cache.writeQuery({
            query: gql`{selectedHenpin}`,
            data: {selectedHenpin: variables.id},
          });
        },
        changeSelectedShoribi: (_root, variables, { cache }) => {
          cache.writeQuery({
            query: gql`{selectedShoribi}`,
            data: {selectedShoribi: variables.date},
          });
        },
        changeSelectedHasseibi: (_root, variables, { cache }) => {
          cache.writeQuery({
            query: gql`{selectedHasseibi}`,
            data: {selectedHasseibi: variables.date},
          });
        },
        changeSelectedFurikaebi: (_root, variables, { cache }) => {
          cache.writeQuery({
            query: gql`{selectedFurikaebi}`,
            data: {selectedFurikaebi: variables.date},
          });
        },
        changeSelectedNissu: (_root, variables, { cache }) => {
          cache.writeQuery({
            query: gql`{selectedNissu}`,
            data: {selectedNissu: variables.value},
          });
        },
        changeSelectedTokunoOption: (_root, variables, { cache }) => {
          cache.writeQuery({
            query: gql`{selectedTokunoOption}`,
            data: {selectedTokunoOption: variables.id},
          });
        },
        changeSelectedHaitanto: (_root, variables, { cache }) => {
          cache.writeQuery({
            query: gql`{selectedHaitanto}`,
            data: {selectedHaitanto: variables.id},
          });
        },
        changeSelectedShukkobi: (_root, variables, { cache }) => {
          cache.writeQuery({
            query: gql`{selectedShukkobi}`,
            data: {selectedShukkobi: variables.date},
          });
        },
        changeSelectedMeihenbi: (_root, variables, { cache }) => {
          cache.writeQuery({
            query: gql`{selectedMeihenbi}`,
            data: {selectedMeihenbi: variables.date},
          });
        },
        changeSelectedTokuno: (_root, variables, { cache }) => {
          cache.writeQuery({
            query: gql`{selectedTokuno}`,
            data: {selectedTokuno: variables.id},
          });
        },
        changeSelectedZeiku: (_root, variables, { cache }) => {
          cache.writeQuery({
            query: gql`{selectedZeiku}`,
            data: {selectedZeiku: variables.id},
          });
        },
      },
    }
  })

  // ローカルステートの初期化
  // DateTimePickerを空にする場合はnullを指定
  cache.writeQuery({
    query: gql`{
      selectedBusho
      selectedTanto
      selectedBaibai
      selectedAzukari
      selectedHenpin
      selectedShoribi
      selectedHasseibi
      selectedFurikaebi
      selectedNissu
      selectedTokunoOption
      selectedHaitanto
      selectedShukkobi
      selectedMeihenbi
      selectedTokuno
      selectedZeiku
    }`,
    data: {
      selectedBusho: '',
      selectedTanto: '',
      selectedBaibai: '0',
      selectedAzukari: '0',
      selectedHenpin: '0',
      selectedShoribi: null,
      selectedHasseibi: null,
      selectedFurikaebi: null,
      selectedNissu: 0,
      selectedTokunoOption: '',
      selectedHaitanto: '',
      selectedShukkobi: null,
      selectedMeihenbi: null,
      selectedTokuno: '', 
      selectedZeiku: '',
    },
  });
  console.log(cache.data)

  // Material-UIのテーマ設定
  // primaryカラーの設定
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: blue[700]
      }
    }, 
  })

  // コンポ―ネントをApolloProviderでラップする
  // <CssBaseline />を追加することで、ブラウザが違っても表示を統一させることができます
  // また、ページのマージンがなくなり、背景色がtheme.palette.background.defaultで指定した色(デフォルトだと薄いグレー)になります
  // Material-UIのコンポーネントで囲まれていない文字列を<Typography />で囲う
  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">
              売上伝票　入力（枚数）
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3}><Busho /></Grid>
          <Grid item xs={3}><Tanto /></Grid>
          <Grid item xs={2}><Baibai /></Grid>
          <Grid item xs={2}><Azukari /></Grid>
          <Grid item xs={2}><Henpin /></Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3}><Shoribi /></Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={2}><Hasseibi /></Grid>
          <Grid item xs={2}><Furikaebi /></Grid>
          <Grid item xs={2}><Nissu /></Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3}><TokunoOption /></Grid>
          <Grid item xs={3}><Haitanto /></Grid>
          <Grid item xs={2}><Shukkobi /></Grid>
          <Grid item xs={2}><Meihenbi /></Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}><Tokuno /></Grid>
          <Grid item xs={2}><Zeiku /></Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}><SubmitButton /></Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}><Meisai /></Grid>
        </Grid>
      </MuiThemeProvider>
    </ApolloProvider>
  )
}
