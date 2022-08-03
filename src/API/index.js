import axios from 'axios';

const API = axios.create({ baseURL: 'https://keygleedispo.herokuapp.com/' });
// const API = axios.create({ baseURL: 'http://localhost:5000/' });

// Intercepts the request to access the website to check if there is a user. Then utilizing the token to grant access.
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`; //Bearer needs to be added for this to work. This function gets token from the profile on local storage. Makes a request to each of these routes utilizing the token.
    }
    return req;
});

export const getAllProps = () => API.get('/allproperties');

// Property Photos
// export const getPropPhoto = (fileName) => API.get(`/propertyphotos?file=${fileName}`);
export const getPropPhoto = (fileName) => API.get(`/propertyphotos/${fileName}`);

//Acq Table
export const fetchProps = (page) => API.get(`/acquisitions?page=${page}`);
export const fetchProp = (id) => API.get(`/acquisitions/${id}`);
export const fetchActiveProps = (pageActive) => API.get(`/activeproperties?page=${pageActive}`);
export const fetchActiveProp = (id) => API.get(`/activeproperties/${id}`);
export const fetchByMarkets = (market) => API.get(`/activeproperties/search?market=${market}`);
export const createProperty = (newProp) =>  API.post('/acquisitions', newProp);
export const updateProp = (id, newProp) => API.put(`${'/acquisitions'}/${id}`, newProp);
export const deleteProperty = (id) => API.delete(`${'/acquisitions'}/${id}`);
export const fetchPropsBySearch = (searchQuery) => API.get(`/acquisitions/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`); //Using front end search query to database on backend to compare and retrive information the user inputs into the query field.
export const getEmployees = (page) =>  API.get(`/users?page=${page}`);


export const createPhoto = (newPhoto) => API.post('/upload', newPhoto);

// Map
export const createMarker = (newMarker) =>  API.post('/marker', newMarker);
export const getMapProps = () => API.get('/map');
export const getMarkers = () => API.get('/marker');
export const updateMarker = (id, newMarker) => API.put(`${'/marker'}/${id}`, newMarker);
export const deleteMarker = (id) => API.delete(`${'/marker'}/${id}`);

// Home
export const getHomeProps = () => API.get('/');
// export const getBooks = () => API.get('/');
// // export const getBooks = (page) => API.get(`/?page=${page}`);
// export const createBook = (newBook) => API.post('/', newBook);

// Dispo Table
export const fetchDispoProps = (page) => API.get(`/dispotable?page=${page}`);
export const createDispoProp = (newDispoProp) =>  API.post('/dispotable', newDispoProp);
export const deleteDispoProperty = (id) => API.delete(`${'/dispotable'}/${id}`);

// Announcement Form
export const getAnnouncements = () => API.get('/announcementform');
export const createAnnouncement = (newAnnouncement) =>  API.post('/announcementform', newAnnouncement);

// Referral Form
export const getReferrals = () => API.get('/referral');
export const createReferral = (newReferral) =>  API.post('/referral', newReferral);
export const updateReferral = (id, newReferral) => API.put(`${'/referral'}/${id}`, newReferral);
export const deleteReferral = (id) => API.delete(`${'/referral'}/${id}`);

// Address Field on Map
export const getAddressMarker = () => API.get('/address');
export const createAddressMarker = (newAddress) => API.post('/address', newAddress);

// Sign in
export const signIn = (loginData) => API.post('/user/login', loginData);
export const userCreation = (loginData) => API.post('/user/createuser', loginData);
export const forgotPassword = (email) => API.put('/user/forgotpassword', email);
export const changeEmployeePass = (token, password) => API.put(`/resetpassword/${token}`, password);
export const updatePassword = (updatePass) => API.post('/updatePassword', updatePass);
export const getUserEmployees = (page) => API.get(`/profile?page=${page}`);
export const updateUser = (id, userData) => API.put(`/profile/${id}`, userData);

export const removeUser = (id) => API.delete(`${'/users'}/${id}`)

// Buyer Sign In
export const buyerUserCreate = (createBuyer) => API.post('/createbuyer', createBuyer);
export const guestSignin = (loginData) => API.post('/guestlogin', loginData);
export const updateBuyerAccount = (id, buyer) => API.put(`${'/createbuyer'}/${id}`, buyer);
export const changeBuyerPass = (token, password) => API.put(`${'/forgotpassword'}/${token}`, password);
// export const updateBuyerPassword = (id, password) => API.put(`${'/createbuyer'}/${id}`, password);
export const getBuyers = () =>  API.get('/createbuyer');
export const getBuyerEmail = (email) => API.put('/forgotpassword', email);


// Wholesaler Sign In
export const wholesalerUserCreate = (createwholesaler) => API.post('/createwholesaler', createwholesaler);
export const wholesaleSignin = (loginData) => API.post('/wholesalerlogin', loginData);
export const updateWholesaler = (id, wholesaler) => API.put(`${'/createwholesaler'}/${id}`, wholesaler);
export const getWholesalers = () =>  API.get('/createwholesaler');

// Property Photos
export const getPhotos = () => API.get('/photos');
export const createPhotos = (newPhotos) =>  API.post('/photos', newPhotos);
export const getPropPhotos = (id, newPhotos) => API.put(`${'/photos'}/${id}`, newPhotos);

//Post Jobs
export const createJob = (newJob) =>  API.post('/postjobs', newJob);
export const getJobs = () =>  API.get('/postjobs');
export const deleteJob = (id) => API.delete(`${'/postjobs'}/${id}`);

//Applications
export const createApplication = (newApp) =>  API.post('/applications', newApp);
export const getApplications = () =>  API.get('/applications');
export const deleteApplication = (id) => API.delete(`${'/applications'}/${id}`);
export const putApplication = (id, newApp) => API.put(`${'/applications'}/${id}`, newApp);

//Offers
export const createOffer = (newOffer) => API.post('/offers', newOffer);
export const getOffers = () => API.get('/offers');

//Warehouse
export const getItems = () => API.get('/warehouse');
export const updateItem = (id, newItem) => API.put(`${'/warehouse'}/${id}`, newItem);
export const createItem = (newItem) =>  API.post('/warehouse', newItem);


// export const slackOffer = (newOffer) => axios.post('https://hooks.slack.com/services/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', newOffer);
// export const slackOffer = (newOffer) => API.post('https://hooks.slack.com/services/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', newOffer)

// Tickets
export const getTickets = () => API.get('/tickets');
export const createTicket = (newTicket) => API.post('/tickets', newTicket);

// Files
export const createFile = (newFile) => API.post('/files', newFile);
export const deleteFile = (id) => API.delete(`${'/files'}/${id}`);
export const getFiles = () => API.get('/files');

// Deal Text
export const createDealText = (newDealText) => API.post('/dealtext', newDealText);

// Submitted Property
export const createSubmitProp = (newSubmitProp) => API.post('/submitproperty', newSubmitProp);

// Buyer Request Login
export const createRequestLogin = (newRequestLogin) => API.post('/requestlogin', newRequestLogin);

// Dispo Employees
export const getDispoReps = () => API.get('/dispoemployees');

// Buyer Properties
export const createBuyerProperty = (newBuyerProp) => API.post('/buyerprops', newBuyerProp);
export const getBuyerProperty = () => API.get('/buyerprops');
export const deleteBuyerProperty = (id) => API.delete(`${'/buyerprops'}/${id}`);
export const fetchBuyerProperties = (page) => API.get(`/buyerproperties?page=${page}`);
export const fetchAllActiveProperties = () => API.get('/allactiveproperties');

// Email Blast
export const createEmail = (newEmail) => API.post('/emailblast', newEmail);

// Close Reports
export const getCloseReports = () => API.get('/closereports');
export const getOpportunityReports = (status) => API.get(`/opportunityreports/${status}`);
export const postOpportunityReports = (status) => API.post('/opportunityreports', status);

// Events
export const postEvent = (event) => API.post('/events', event);
export const fetchEvent = () => API.get('/events');

// Payout Data
export const postPayoutData = (payout) => API.post('/payoutdata', payout);
export const fetchPayoutData = (month) => API.get('/payoutdata', month);
export const removePayout = (id) => API.delete(`/payoutdata/${id}`);
