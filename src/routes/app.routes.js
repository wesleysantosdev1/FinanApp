import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Homes from "../pages/Homes";
import New from "../pages/New";
import Profile from "../pages/Profile";
import CustomDrawer from "../components/CustomDrawer";

const AppDrawer = createDrawerNavigator();

function AppRoutes(){
    return(
        <AppDrawer.Navigator
        drawerContent={ (props) => <CustomDrawer {...props} /> }
        screenOptions={{
            headerShown: false,
            drawerStyle: {
                backgroundColor: '#fff',
                paddingTop: 20,
            }, 

            drawerItemStyle: {
                marginVertical: 8,
                borderRadius: 8
            },
            drawerActiveBackgroundColor: '#3b3dbf',
            drawerActiveTintColor: '#fff', 
            drawerInactiveBackgroundColor: '#f0f2ff', 
            drawerInactiveTintColor: '#121212',

        }}
        >
            <AppDrawer.Screen name="Home" component={Homes} />
            <AppDrawer.Screen name="Registar" component={New} />
            <AppDrawer.Screen name="Perfil" component={Profile}/>
        </AppDrawer.Navigator>
    )
}

export default AppRoutes;