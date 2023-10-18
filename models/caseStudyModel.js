const mongoose = require('mongoose');

const caseStudySchema = new mongoose.Schema({ 
    image: {
        type: String,
    },
    title: {
        type: String,
    },
    text: {
        type: String,
    },
    domain: [{
        type: String,
        enum: [
            'Website Designed',
            'Apps Developed',
            'SEO',
            'Happy Clients',
            'AI & IOT solutions',
            'Games Developed',
            'Data Science projects',
            'Other',
        ],
    }]
});

module.exports = mongoose.model('caseStudyModel', caseStudySchema);