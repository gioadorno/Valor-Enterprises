export default (jobs = [], action) => {
    switch (action.type) {
        case 'DeleteJob':
            return jobs.filter((job) => job._id !=action.payload);
        case 'FetchJob':
            return action.payload;
        case 'CreateJob':
            return [...jobs, action.payload];
        default:
            return jobs;
    }
};

