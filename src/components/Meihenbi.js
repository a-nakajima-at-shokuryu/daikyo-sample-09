import React from 'react'

// Material-UI＆日付関連のimport
import { makeStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import ja from 'date-fns/locale/ja'
import format from 'date-fns/format'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { FormControl } from '@material-ui/core'

// GraphQL関連のimport
import gql from 'graphql-tag'

// Apollo-Client関連のimport
import { useQuery, useMutation } from 'react-apollo-hooks'


// ローカルステートを更新するmutation
const CHANGE_MEIHENBI = gql`
    mutation changeSelectedMeihenbi($date: String!) {
        changeSelectedMeihenbi(date: $date) @client
    }
`

// データ取得クエリ
const GET_MEIHENBI = gql`
    query {
        selectedMeihenbi @client
    }
`

// Material-UIのスタイル設定
const useStyles = makeStyles({
    root: {
        margin: '10px',
        minWidth: '90%',
    },
});


export default function Meihenbi() {

    const classes = useStyles();

    // DateTimePicker変更時
    const doChangeDateTimePicker = date => {
        let myDate = null
        if (date !== null) {
            if (date.toString() !== "Invalid Date") {
                myDate = format(date, 'yyyy-MM-dd')
            }
        }
        changeSelectedMeihenbi({
            variables: {
                'date': myDate
            }
        })
    }

    // useMutaion
    const [changeSelectedMeihenbi] = useMutation(CHANGE_MEIHENBI)

    // ローカルステート取得
    const { loading, error, data } = useQuery(GET_MEIHENBI)
    
    // 通信状態に応じたコンポーネントを表示
    if (loading) return <p>Loading...</p>
    if (error)   return <p>Error: {error}</p>
    
    const selectedValue = data.selectedMeihenbi

    return (
        <FormControl className={classes.root}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    margin="normal"
                    id="meihenbi-date-picker-dialog"
                    label="名変日"
                    format="yyyy-MM-dd"
                    locale={ja} 
                    value={selectedValue}
                    onChange={doChangeDateTimePicker}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>
        </FormControl>
    )

}
