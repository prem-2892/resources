'use client'

import { Provider } from 'react-redux'
import store from './store'

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

export default StoreProvider

// this is an HOC that will access the store
