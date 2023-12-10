import React, {useState, useEffect} from 'react'
import "../styles/Test.css";
import ListenPart1 from './ListenPart1';
import ListenPart2 from './ListenPart2';
import ListenPart3 from './ListenPart3';
import ListenPart4 from './ListenPart4';
import ReadPart1 from './ReadPart1';
import ReadPart2 from './ReadPart2';
import ReadPart3 from './ReadPart3';
import api from '../api/Api';
import { useLocation} from "react-router-dom";
function TestView() {
    const location = useLocation();
    const {item, flag} = location.state;
    const [sign, SetSign] = useState('')
    const [testname, setTestName] = useState('');
    const [listenP1, SetListenP1] = useState(new Array(6).fill({}))
    const [listenP2, SetListenP2] = useState( new Array(25).fill({}))
    const [listenP3, SetListenP3] = useState( new Array(13).fill({}))
    const [listenP4, SetListenP4] = useState( new Array(10).fill({}))
    const [readP1, SetReadP1] = useState( new Array(30).fill({}))
    const [readP2, SetReadP2] = useState( new Array(4).fill({}))
    const [readP3, SetReadP3] = useState( new Array(15).fill({}))

    useEffect(() => {
        setTestName(item.Name);
        SetListenP1(item.Part1);
        SetSign('L1');
        SetListenP2(item.Part2);
        SetListenP3(item.Part3);
        SetListenP4(item.Part4);
        SetReadP1(item.Part5);
        SetReadP2(item.Part6);
        SetReadP3(item.Part7);
    }, []);

    const onSave = async()=>{
        const test = {
            Part1:listenP1,
            Part2:listenP2,
            Part3:listenP3,
            Part4:listenP4,
            Part5:readP1,
            Part6:readP2,
            Part7:readP3,
            Time: 120,
            Name: testname,
        }
        console.log(test);

        await api.updateTest(item.Id, test);
        alert('Update test successfully');
    }

  return (
    <div>
   <div style={{display:'flex', margin:'auto', width:'60%'}}>
        <button onClick={() => SetSign('L1')} className={(sign=='L1')?'TextClick':'TextNormal'}>ListenPart1</button>
        <button onClick={() => SetSign('L2')} className={(sign=='L2')?'TextClick':'TextNormal'}>ListenPart2</button>
        <button onClick={() => SetSign('L3')} className={(sign=='L3')?'TextClick':'TextNormal'}>ListenPart3</button>
        <button onClick={() => SetSign('L4')} className={(sign=='L4')?'TextClick':'TextNormal'}>ListenPart4</button>
        <button onClick={() => SetSign('R1')} className={(sign=='R1')?'TextClick':'TextNormal'}>ReadPart1</button>
        <button onClick={() => SetSign('R2')} className={(sign=='R2')?'TextClick':'TextNormal'}>ReadPart2</button>
        <button onClick={() => SetSign('R3')} className={(sign=='R3')?'TextClick':'TextNormal'}>ReadPart3</button>    
        {flag=='fix' && <button onClick={() => onSave()} style={{marginLeft:'8%'}} >Save</button>}
    </div>
    <div style={{marginTop:30, height:550, overflow:'auto'}}>
    <div style={{marginLeft: '20%', width: '40%'}} className='testname-wrapper'>
        <label style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
            Test name:
            <textarea value={testname} onChange={(e) => setTestName(e.target.value)}/>
        </label>
    </div>
    
    {(sign=='L1')&&
    listenP1.map((each,key)=>{
        return(
            <ListenPart1 
            flag={flag}
            index={key}
            complete = {(data)=>{
                let list = listenP1.slice();
                list[key] = {...data}
                SetListenP1(list)
            }}
            item={each}
            />
        )
    })
    }
    {(sign=='L2')&&
    listenP2.map((each,key)=>{
        return(
            <ListenPart2 flag={flag} index={key+6}
            complete = {(data)=>{
                let list = listenP2.slice();
                list[key] = {...data}
                SetListenP2(list)
            }}
            item={each}
            />
        )
    })
    }
     {(sign=='L3')&&
    listenP3.map((each,key)=>{
        return(
            <ListenPart3 flag={flag} index={key}
            complete = {(data)=>{
                let list = listenP3.slice();
                list[key] = {...data}
                SetListenP3(list)
            }}
            item={each}
            />
        )
    })
    }
     {(sign=='L4')&&
    listenP4.map((each,key)=>{
        return(
            <ListenPart4 flag={flag} index={key}
            complete = {(data)=>{
                let list = listenP4.slice();
                list[key] = {...data}
                SetListenP4(list)
            }}
            item={each}
            />
        )
    })
    }
      {(sign=='R1')&&
    readP1.map((each,key)=>{
        return(
            <ReadPart1 flag={flag} index={key}
            complete = {(data)=>{
                let list = readP1.slice();
                list[key] = {...data}
                SetReadP1(list)
            }}
            item={each}
            />
        )
    })
    }
      {(sign=='R2')&&
    readP2.map((each,key)=>{
        return(
            <ReadPart2 flag={flag} index={key}
            complete = {(data)=>{
                let list = readP2.slice();
                list[key] = {...data}
                SetReadP2(list)
            }}
            item={each}
            />
        )
    })
    }
      {(sign=='R3')&&
    readP3.map((each,key)=>{
        return(
            <ReadPart3 flag={flag} index={key}
            complete = {(data)=>{
                let list = readP3.slice();
                list[key] = {...data}
                SetReadP3(list)
            }}
            item={each}
            />
        )
    })
    }
    </div>

    </div>
  )
}

export default TestView