import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HeroUIProvider } from '@heroui/react'
import { RouterProvider } from 'react-router'
import { Routing } from './Routing/AppRouter.jsx'
import { Toaster } from 'react-hot-toast'
import Authcontext from './context/Authcontext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const client = new QueryClient()



createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={client} >
        <Authcontext>



            <HeroUIProvider>
                <RouterProvider router={Routing} />
                <Toaster position="top-right"
                    reverseOrder={false} />
            </HeroUIProvider>

        </Authcontext>
    </QueryClientProvider>
)
