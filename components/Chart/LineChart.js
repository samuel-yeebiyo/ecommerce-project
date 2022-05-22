import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import { useState, useEffect } from 'react'

export default function LineChart ({view, data}) {

    const [labels, setLabels] = useState([])


    useEffect(()=>{

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]


        if(view == "daily") {

            const current = new Date().getDay()
            console.log({current})
            let newLabels = []
            for(let i=0; i<7; i++){
                if(current+i <= 6) newLabels.push(days[current+i])
                else{
                    let idx = (current+i)-7
                    newLabels.push(days[idx])
                }
            }
            console.log({newLabels})
            setLabels(newLabels)

        }
        else if(view == "monthly"){
            
            //get the current month go back 3 months and go forward three months
            const current = new Date().getMonth()
            let newLabels = []
            for(let i=6; i>=0; i--){
                if(current-i < 0 ){
                    let idx = 12+(current-i)
                    newLabels.push(months[idx])
                }else newLabels.push(months[current-i])
            }
            setLabels(newLabels)

        }


    },[view])

    return(
        <Line
            data={{
                labels:labels,
                datasets:[{
                    label:"Revenue",
                    data:data,
                    borderColor:'#FFFF',
                    borderWidth:2,
                    pointBackgroundColor:"#ff0e0e",
                    pointBorderColor:"#ff0e0e",
                    tension:0.25
                    
                }]
            }}
            width={400}
            height={400}
            options={{
                maintainAspectRatio:false
            }}
        />
    )
}