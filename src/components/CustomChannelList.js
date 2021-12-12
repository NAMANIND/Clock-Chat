import { ChannelList, useChatContext } from 'stream-chat-react';
import  styled  from 'styled-components';
import { useEffect, useState} from 'react';
import ChannelListContainer from './ChannelListContainer';

const Container = styled.div`
    height: 100vh;
    background-color: #61C0BF;
    padding: 20px 10px;
    
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;

        h2{
            color: white;
            margin: 0 0 10px;
            font-size: 25px;
        }

        button{
            color: white;
            font-size: 30px;
            background: none;
            background: none;
            cursor: pointer;
            padding-bottom: 10px;
        }
    }
    .str-chat {
        height: max-content;
        &.str-chat-channel-list{
            float: none;
            background-color: #BBDED6;
        }

    }
    .channel-list{
        width : 100%;
        &__message{
            color: white;
        }
       
    }


`;

const randomStr = () => Math.random.toString(36).substring(7);

export default function CustomChannelList({onClickAdd}){

    const{client} = useChatContext();
    const [channelListkey , setChannelListkey] = useState(randomStr());
    const filters = {
        members: {$in: [client.user.id]},
    }

    useEffect(() => {
        client.on("member.added",() => {
            setChannelListkey(randomStr());
        })
    },[]);

    return (
        <Container>
            <div className = "header">
            <button onClick={k}>🕐</button>    
            <h2>Channels</h2>
            <button onClick={onClickAdd}>+</button>
            </div>

        <ChannelList 
            key={channelListkey}
            List={listProp => <ChannelListContainer{... listProp} />}
            filters={filters}
        />
        </Container>
    );

    function k() {
        var x = document.getElementById("root");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
    }

}