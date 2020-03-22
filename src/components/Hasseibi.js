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
const CHANGE_HASSEIBI = gql`
    mutation changeSelectedHasseibi($date: String!) {
        changeSelectedHasseibi(date: $date) @client
    }
`

// データ取得クエリ
const GET_HASSEIBI = gql`
    query {
        selectedHasseibi @client
    }
`

// Material-UIのスタイル設定
const useStyles = makeStyles({
    root: {
        margin: '10px',
        minWidth: '90%',
    },
});


export default function Hasseibi() {

    const classes = useStyles();

    // DateTimePicker変更時
    const doChangeDateTimePicker = date => {
        let myDate = null
        if (date !== null) {
            if (date.toString() !== "Invalid Date") {
                myDate = format(date, 'yyyy-MM-dd')
            }
        }
        changeSelectedHasseibi({
            variables: {
                'date': myDate
            }
        })
    }

    // useMutaion
    const [changeSelectedHasseibi] = useMutation(CHANGE_HASSEIBI)

    // ローカルステート取得
    const { loading, error, data } = useQuery(GET_HASSEIBI)
    
    // 通信状態に応じたコンポーネントを表示
    if (loading) return <p>Loading...</p>
    if (error)   return <p>Error: {error}</p>
    
    const selectedValue = data.selectedHasseibi

    return (
        <FormControl className={classes.root}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    margin="normal"
                    id="hasseibi-date-picker-dialog"
                    label="発生日"
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
