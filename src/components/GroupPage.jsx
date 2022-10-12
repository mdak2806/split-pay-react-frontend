import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { request } from '../utils/request'
const GroupPage = (props) => {
    const [group, setGroup] = useState(null);
    const [currentUser, setCurrentUser] = useState(props.user);

    const { id } = useParams();

    useEffect(() => {
        request().get('/groups').then(response => {
            setGroup(response.data.find(group => group._id === id))
        })
    }, [props.user])

   
}

export default GroupPage;