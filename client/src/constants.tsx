import { Contact, MessageCircle, Settings, User2 } from "lucide-react";

export const navMenu = [
    {
        label:'Profile',
        link:'/profile',
        icon:<User2/>
    },
    {
        label:'Chats',
        link:'/chats',
        icon:<MessageCircle/>
    },
    {
        label:'Contacts',
        link:'/contacts',
        icon:<Contact/>
    },
    {
        label:'Settings',
        link:'/settings',
        icon:<Settings/>
    }
]