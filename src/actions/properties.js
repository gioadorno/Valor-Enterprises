import * as api from '../API';
import { FETCH_BY_SEARCH, START_LOADING, END_LOADING, DELETE_LOADING, END_DELETE, START_CREATING, END_CREATING, ACTIVE_PROPERTIES_LOADING, END_ACTIVE_LOADING, FETCH_PROPERTY, START_LOADING_PROP, END_LOADING_PROP, START_UPDATING, END_UPDATING, FETCH_BY_MARKETS, FETCH_ACTIVE_PROPERTY  } from '../constants/actionTypes';


export const getProp = (id) => async (dispatch) => { 
    try {
        dispatch({ type: START_LOADING_PROP })

        const { data } = await api.fetchProp(id); 
        
        dispatch({ type: FETCH_PROPERTY, payload: data}); 

        dispatch({ type: END_LOADING_PROP  })
    } catch (error) {
        console.log(error.message)
    }
};

export const getAllActiveProperties = () => async (dispatch) => {
    try {
        const { data } = await api.fetchAllActiveProperties();

        dispatch({ type: 'GETALLPROPERTIES', payload: data })
    } catch (error) {
        console.log(error)
    }
}

// Action Creators - functions that return an action
export const getProps = (page) => async (dispatch) => { 
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.fetchProps(page); 
        dispatch({ type: 'fetch', payload: data}); 

        dispatch({ type: END_LOADING  })
    } catch (error) {
        console.log(error.message)
    }
};


export const getPropertyPhotos = (fileName) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.getPropPhoto(fileName); 
        dispatch({ type: 'GETPHOTOS', payload: data}); 

        dispatch({ type: END_LOADING  })
    } catch (error) {
        console.log(error.message)
    }
}

export const getPropsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data: { data } } = await api.fetchPropsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: data});

        dispatch({ type: END_LOADING  });
    } catch (error) {
        console.log(error)
    }
};

export const createProp = (newProp, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_CREATING });
        const { data } = await api.createProperty(newProp);

        dispatch({ type: 'create', payload: data });
        dispatch({ type: END_CREATING  });
    } catch (error) {
        console.log(error)
    }
};

export const uploadPhoto = async (photo) => {
    try {
        const { data } = await api.createPhoto(photo);
        console.log(data)
    } catch (error) {
        
    }
}

// Maps
export const getMapProps = () => async (dispatch) => { 
    try {
        const { data } = await api.fetchProps(); 

        dispatch({ type: 'fetch', payload: data}); 
    } catch (error) {
        console.log(error.message)
    }
};

// All Properties
export const getAllProperties = () => async (dispatch) => { 
    try {
        const { data } = await api.getAllProps(); 
        
        dispatch({ type: 'fetchall', payload: data}); 
    } catch (error) {
        console.log(error.message)
    }
};

// All Properties
export const getAllProps = () => async (dispatch) => { 
    try {
        const { data } = await api.getAllProps(); 
        
        dispatch({ type: 'GETALLPROPERTIES', payload: data}); 
    } catch (error) {
        console.log(error.message)
    }
};


// Homepage
export const getHomeProps = () => async (dispatch) => { 
    try {
        const { data } = await api.fetchProps(); 

        dispatch({ type: 'fetch', payload: data}); 
    } catch (error) {
        console.log(error.message)
    }
};


// Update Status on Acq Table
export const updateProp = (id, prop ) => async (dispatch) => {
    try {
        // dispatch({ type: START_UPDATING });

        const { data } = await api.updateProp(id, prop);
        dispatch({ type: 'UPDATE', payload: data });
        // window.location.reload();
        // dispatch({ type: END_UPDATING  });
    } catch (error) {
        console.log(error);
    }
};

// Delete Property
export const deleteProp = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_LOADING });

        await api.deleteProperty(id);
        dispatch({ type: 'DELETE', payload: id });

        dispatch({ type: END_DELETE  });
    } catch (error) {
        console.log(error);
    }
};

export const getActiveProps = (pageActive) => async (dispatch) => { 
    try {
        dispatch({ type: ACTIVE_PROPERTIES_LOADING })
        const { data } = await api.fetchActiveProps(pageActive); 

        dispatch({ type: 'fetchactive', payload: data}); 
        dispatch({ type: END_ACTIVE_LOADING  })
    } catch (error) {
        console.log(error.message)
    }
};


export const getActiveMarkets = (market) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.fetchByMarkets(market);
        dispatch({ type: FETCH_BY_MARKETS, payload: data});

        dispatch({ type: END_LOADING  });
    } catch (error) {
        console.log(error.message)
    }
};

export const getActiveProp = (id) => async (dispatch) => { 
    try {

        const { data } = await api.fetchActiveProp(id); 
        
        dispatch({ type: FETCH_ACTIVE_PROPERTY, payload: data}); 

    } catch (error) {
        console.log(error.message)
    }
};