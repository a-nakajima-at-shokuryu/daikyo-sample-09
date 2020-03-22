import React from 'react'

// Material-UI関連のimport
import { makeStyles } from '@material-ui/core/styles'
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
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
const GET_ZEIKU = gql`
    query getData($id: String) {
        selectedZeiku @client
        zeiku(id: $id) {
            id
            name
        }
    }
`

// ローカルステートを更新するmutation
const CHANGE_ZEIKU = gql`
    mutation changeSelectedZeiku($id: String!) {
        changeSelectedZeiku(id: $id) @client
    }
`

export default function Zeiku() {

    const classes = useStyles();

    // コンボボックス変更時
    const doChangeSelect = (e) => {
        changeSelectedZeiku({
            variables: {
                'id': e.target.value
            }
        })
    }

    // useMutaion
    const [changeSelectedZeiku] = useMutation(CHANGE_ZEIKU)

    // ローカルステート＆データ全件取得
    const { loading, error, data } = useQuery(GET_ZEIKU)
    
    // 通信状態に応じたコンポーネントを表示
    if (loading) return <p>Loading...</p>
    if (error)   return <p>Error: {error}</p>
    
    const selectedValue = data.selectedZeiku
    const datas = data.zeiku

    return (
        <FormControl className={classes.root}>
            <InputLabel id="my-label">税区分</InputLabel>
            <Select
                labelId="my-label"
                id="my-select"
                value={selectedValue}
                onChange={e => doChangeSelect(e)}
            >
            <MenuItem key="" value="">未選択</MenuItem>
            {datas.map(repo => (
                <MenuItem key={repo.id} value={repo.id}>{repo.id} - {repo.name}</MenuItem>
            ))}
            </Select>
        </FormControl>
    )

}
