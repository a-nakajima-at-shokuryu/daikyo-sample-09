import React from 'react'

// Material-UI関連のimport
import { makeStyles } from '@material-ui/core/styles'
import {
    FormControl,
    TextField,
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
const GET_NISSU = gql`
    query {
        selectedNissu @client
    }
`

// ローカルステートを更新するmutation
const CHANGE_NISSU = gql`
    mutation changeSelectedNissu($value: Int!) {
        changeSelectedNissu(value: $value) @client
    }
`

export default function Nissu() {

    const classes = useStyles();

    // コンボボックス変更時
    const doChangeTextField = (e) => {
        changeSelectedNissu({
            variables: {
                'value': e.target.value
            }
        })
    }

    // useMutaion
    const [changeSelectedNissu] = useMutation(CHANGE_NISSU)

    // ローカルステート＆データ全件取得
    const { loading, error, data } = useQuery(GET_NISSU)
    
    // 通信状態に応じたコンポーネントを表示
    if (loading) return <p>Loading...</p>
    if (error)   return <p>Error: {error}</p>
    
    const selectedValue = data.selectedNissu

    return (
        <FormControl className={classes.root}>
            <TextField
                id="my-number"
                label="日数"
                type="number"
                value={selectedValue}
                onChange={e => doChangeTextField(e)}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </FormControl>
    )

}
