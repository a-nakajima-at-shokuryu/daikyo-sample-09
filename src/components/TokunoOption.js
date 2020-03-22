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
const GET_TOKUNO_OPTION = gql`
    query getData($id: String) {
        selectedTokunoOption @client
        tokuno_option(id: $id) {
            id
            name
        }
    }
`

// ローカルステートを更新するmutation
const CHANGE_TOKUNO_OPTION = gql`
    mutation changeSelectedTokunoOption($id: String!) {
        changeSelectedTokunoOption(id: $id) @client
    }
`

export default function TokunoOption() {

    const classes = useStyles();

    // コンボボックス変更時
    const doChangeSelect = (e) => {
        changeSelectedTokunoOption({
            variables: {
                'id': e.target.value
            }
        })
    }

    // useMutaion
    const [changeSelectedTokunoOption] = useMutation(CHANGE_TOKUNO_OPTION)

    // ローカルステート＆データ全件取得
    const { loading, error, data } = useQuery(GET_TOKUNO_OPTION)
    
    // 通信状態に応じたコンポーネントを表示
    if (loading) return <p>Loading...</p>
    if (error)   return <p>Error: {error}</p>
    
    const selectedValue = data.selectedTokunoOption
    const datas = data.tokuno_option

    return (
        <FormControl className={classes.root}>
            <InputLabel id="my-label">得意先</InputLabel>
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
