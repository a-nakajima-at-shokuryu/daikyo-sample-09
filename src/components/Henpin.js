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
const GET_HENPIN = gql`
    query getData($id: String) {
        selectedHenpin @client
        henpin(id: $id) {
            id
            name
        }
    }
`

// ローカルステートを更新するmutation
const CHANGE_HENPIN = gql`
    mutation changeSelectedHenpin($id: String!) {
        changeSelectedHenpin(id: $id) @client
    }
`

export default function Henpin() {

    const classes = useStyles();

    // ラジオボタン変更時
    const doChangeRadio = (e) => {
        changeSelectedHenpin({
            variables: {
                'id': e.target.value
            }
        })
    }

    // useMutaion
    const [changeSelectedHenpin] = useMutation(CHANGE_HENPIN)

    // ローカルステート＆データ全件取得
    const { loading, error, data } = useQuery(GET_HENPIN)
    
    // 通信状態に応じたコンポーネントを表示
    if (loading) return <p>Loading...</p>
    if (error)   return <p>Error: {error}</p>
    
    const selectedValue = data.selectedHenpin
    const datas = data.henpin

    return (
        <FormControl className={classes.root}>
            <FormLabel component="legend">返品区分</FormLabel>
            <RadioGroup row aria-label="gender" value={selectedValue} onChange={doChangeRadio}>
            {datas.map(repo => (
                <FormControlLabel key={repo.id} value={repo.id} control={<Radio />} label={repo.name} />
            ))}
            </RadioGroup>
        </FormControl>
    )

}
