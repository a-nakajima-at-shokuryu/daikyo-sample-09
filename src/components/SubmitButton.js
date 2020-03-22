import React from 'react'

// Material-UI関連のimport
import { Button } from '@material-ui/core/'

// GraphQL関連のimport
import gql from 'graphql-tag'

// Apollo-Client関連のimport
import { useQuery } from 'react-apollo-hooks'


// ローカルステートを取得するクエリ
const GET_LOCAL_STATE = gql`
    query {
        selectedBusho @client
        selectedTanto @client
        selectedBaibai @client
        selectedAzukari @client
        selectedHenpin @client
        selectedShoribi @client
        selectedHasseibi @client
        selectedFurikaebi @client
        selectedNissu @client
        selectedShukkobi @client
        selectedMeihenbi @client
        selectedTokunoOption @client
        selectedHaitanto @client
        selectedTokuno @client
        selectedZeiku @client
    }
`

export default function SubmitButton() {

    // ボタンクリック時
    const doClickButton = () => {
        const msg = 
        "部署: " + data.selectedBusho + "\n" +
        "担当: " + data.selectedTanto + "\n" +
        "売買区分: " + data.selectedBaibai + "\n" +
        "預り区分: " + data.selectedAzukari + "\n" +
        "返品区分: " + data.selectedHenpin + "\n" +
        "処理日: " + data.selectedShoribi + "\n" +
        "発生日: " + data.selectedHasseibi + "\n" +
        "振替日: " + data.selectedFurikaebi + "\n" +
        "日数: " + data.selectedNissu + "\n" +
        "得意先区分: " + data.selectedTokunoOption + "\n" +
        "配担当: " + data.selectedHaitanto + "\n" +
        "出庫日: " + data.selectedShukkobi + "\n" +
        "名変日: " + data.selectedMeihenbi + "\n" +
        "得意先: " + data.selectedTokuno + "\n" +
        "税区分: " + data.selectedZeiku + "\n"
        alert(msg)
    }

    // ローカルステート取得
    const { data } = useQuery(GET_LOCAL_STATE)

    return (
        <Button variant="contained" color="primary" onClick={e => doClickButton()}>処理</Button>
    )

}
