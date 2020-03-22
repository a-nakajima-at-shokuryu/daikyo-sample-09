import React from 'react'

// Material-UI関連のimport
import { makeStyles } from '@material-ui/core/styles'
import {
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
} from '@material-ui/core'

// GraphQL関連のimport
import gql from 'graphql-tag'

// Apollo-Client関連のimport
import { useQuery, useMutation } from 'react-apollo-hooks'

// Material-UIのスタイル設定
const useStyles = makeStyles({
    root: {
        margin: '10px',
        minWidth: '90%',
    },
});

// データ取得クエリ
const GET_AZUKARI = gql`
    query getData($id: String) {
        selectedAzukari @client
        azukari(id: $id) {
            id
            name
        }
    }
`

// ローカルステートを更新するmutation
const CHANGE_AZUKARI = gql`
    mutation changeSelectedAzukari($id: String!) {
        changeSelectedAzukari(id: $id) @client
    }
`

export default function Azukari() {

    const classes = useStyles();

    // ラジオボタン変更時
    const doChangeRadio = (e) => {
        changeSelectedAzukari({
            variables: {
                'id': e.target.value
            }
        })
    }

    // useMutaion
    const [changeSelectedAzukari] = useMutation(CHANGE_AZUKARI)

    // ローカルステート＆データ全件取得
    const { loading, error, data } = useQuery(GET_AZUKARI)
    
    // 通信状態に応じたコンポーネントを表示
    if (loading) return <p>Loading...</p>
    if (error)   return <p>Error: {error}</p>
    
    const selectedValue = data.selectedAzukari
    const datas = data.azukari

    return (
        <FormControl className={classes.root}>
            <FormLabel component="legend">預り区分</FormLabel>
            <RadioGroup row aria-label="gender" value={selectedValue} onChange={doChangeRadio}>
            {datas.map(repo => (
                <FormControlLabel key={repo.id} value={repo.id} control={<Radio />} label={repo.name} />
            ))}
            </RadioGroup>
        </FormControl>
    )

}
