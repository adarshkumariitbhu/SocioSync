import { Avatar, AvatarBadge, Box, Button, Card, HStack,Image,Text } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {setRoom} from '../../redux/Slices/onlineSlice'
import { acceptrequest, deleterequest, rejectrequest } from '../../services/operations/friendsAPI'
import { useNavigate } from 'react-router-dom'
export const UserContacts = (props) => {
    const num = 0
    const {name, cardType, userName, key} = props
    // console.log("userName is ...", userName)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector(state => state.auth) || localStorage.authToken;
    const {currentRoom} = useSelector(state => state.online);

    const handleCardClick = () => {
        if(currentRoom === null || currentRoom.userName !== userName){
            dispatch(setRoom({"userName": userName, "name": name}));
        }
    }

    const handleAcceptRequest = () => {
        dispatch(acceptrequest(token, userName, navigate));
    }

    const handleRejectRequest = () => {
        dispatch(rejectrequest(token, userName, navigate));
    }

    const handleDeleteRequest = () => {
        dispatch(deleterequest(token, userName, navigate));
    }

    const btns = cardType === "invites" ? <HStack w={"100%"} mr={4} ml={1}>
        <Button 
        bg={"purple.300"} 
        size={"sm"} 
        fontSize={"small"} 
        p={0} pr={1} pl={1}
        onClick={handleAcceptRequest}
        >
            Accept Request
        </Button>
        <Button 
        bg={"purple.300"} 
        size={"sm"} 
        fontSize={"small"} 
        p={0} 
        pr={1} 
        pl={1}
        onClick={handleRejectRequest}
        >
            Decline
        </Button>
        </HStack> : cardType === "requests" ? 
        <Button 
        bg={"purple.300"} 
        size={"sm"} 
        fontSize={"small"} 
        p={0} pr={1} pl={1}
        onClick={handleDeleteRequest}
        >
            Unsend Request
        </Button>:<></>
  return (
    <Card
    bg={"inherit"}
    color={"gray.300"}
    _active={{bg: "gray.600"}}
    w={"100%"}
    pl={2}
    borderRadius={"lg"}
    _hover={{bg: "gray.600", cursor:"pointer"}}
    key={key}
    onClick={cardType === "friends" && handleCardClick}
    >
        <HStack w={"100%"} pt={2} pb={2} gap={5}>
            <Avatar src={`https://api.dicebear.com/5.x/initials/svg?seed=${name}`} size={"sm"}>
                {num > 0 && 
                <AvatarBadge 
                bg={"green.400"}
                border={0}
                boxSize={"1em"}>
                    {num}
                </AvatarBadge>}
            </Avatar>
            <Box w={"100%"}>
                <Text fontSize={"sm"} color={"gray.200"} mb={3}>{name}</Text>
                {btns}
            </Box>
        </HStack>
    </Card>
  )
}
