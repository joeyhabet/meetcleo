import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from 'store/reducers'
import rootSaga from 'store/sagas'

export default () => {
    const middleware = []
    const sagaMiddleware = createSagaMiddleware()
    middleware.push(sagaMiddleware)

    let enhancer = applyMiddleware(...middleware)
    const store = createStore(rootReducer, enhancer)
    
    sagaMiddleware.run(rootSaga)

    return store
}