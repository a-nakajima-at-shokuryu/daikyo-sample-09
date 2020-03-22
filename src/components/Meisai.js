import React from 'react'

// Material-UI関連のimport
import { makeStyles } from '@material-ui/core/styles'
import { FormControl } from '@material-ui/core'
import MUIDataTable from 'mui-datatables'

// GraphQL関連のimport
import gql from 'graphql-tag'

// Apollo-Client関連のimport
import { useQuery } from 'react-apollo-hooks'

// Material-UIのスタイル設定
const useStyles = makeStyles({
    root: {
        margin: '10px',
        minWidth: '98%',
    },
});

// データ取得クエリ
const GET_MEISAI = gql`
    query getData($id: String) {
        meisai(id: $id) {
            id
            hinmei
            size
		    yoryo
            irisu
            maisu
            tanka
            kingaku
            gensan
            genkako
            ikusei
        }
    }
`

export default function Meisai() {

    const classes = useStyles();

    // 列定義
    const columns = [
        {
            name: 'hinmei', label: '品名', 
            options: {
                sort: true, 
                filter: true,
            }, 
        }, 
        {
            name: 'size', label: 'サイズ', 
            options: {
                sort: true, 
                filter: true,
            }, 
        }, 
        {
            name: 'yoryo', label: '容量', 
            options: {
                sort: true, 
                filter: true,
            }, 
        }, 
        {
            name: 'irisu', label: '入数', 
            options: {
                sort: true, 
                filter: true,
            }, 
        }, 
        {
            name: 'maisu', label: '枚数', 
            options: {
                sort: true, 
                filter: true,
            }, 
        }, 
        {
            name: 'tanka', label: '単価', 
            options: {
                sort: true, 
                filter: true,
            }, 
        }, 
        {
            name: 'kingaku', label: '金額', 
            options: {
                sort: true, 
                filter: true,
            }, 
        }, 
        {
            name: 'gensan', label: '原産地・原料原産地', 
            options: {
                sort: true, 
                filter: true,
            }, 
        }, 
        {
            name: 'genkako', label: '加工地・原産国名', 
            options: {
                sort: true, 
                filter: true,
            }, 
        }, 
        {
            name: 'ikusei', label: '育成', 
            options: {
                sort: true, 
                filter: true,
            }, 
        }, 
    ];
       
    // データ全件取得
    const { loading, error, data } = useQuery(GET_MEISAI)

    // 通信状態に応じたコンポーネントを表示
    if (loading) return <p>Loading...</p>
    if (error)   return <p>Error: {error}</p>

    const datas = data.meisai

    return (
        <FormControl className={classes.root}>
            <MUIDataTable
                data={datas}
                columns={columns}
            />
        </FormControl>
    )

}
