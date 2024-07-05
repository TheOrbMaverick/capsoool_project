import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

//This is the layout for the screens that authenticates the user

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
        name='login'
        options={{
          headerShown: false
        }}
        />

        <Stack.Screen
        name='signup'
        options={{
          headerShown: false
        }}
        />
      </Stack>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  )
}

export default AuthLayout