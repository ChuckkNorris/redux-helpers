# Redux Helpers
Pure functions to simplify the creation of actions, async actions, reducers, and async reducers

Currently supports Fetch/Axios async requests

## Installation
Not yet available

## Example

```
import {createAction, createReducer, createAsyncFetchAction, createAsyncReducer } from 'redux-helpers'

// Basic Action
const openDogModal = (breed) => createAction('OPEN_DOG_MODAL', {breed});

// Basic Reducer
const dogModalReducer = () => createReducer(
  // initial state
  {isOpen: false, breed: undefined},
  {
    'OPEN_DOG_MODAL': (state, action) => ({
      isOpen: true,
      breed: action.breed
    })
});

// Create an async action
const fetchDogBreedImage = (breed) => createAsyncFetchAction(
  'FETCH_DOG_BREED',
  () => fetch(`https://dog.ceo/api/breed/${breed}/image/random`),
  { breed }
);

// Create an async reducer to handle the action
const dogBreedReducer = createAsyncReducer('FETCH_DOG_BREED')

```