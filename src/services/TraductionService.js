var MappedJobs = new Map();
MappedJobs.set("actor", "Acteur");
MappedJobs.set("actress", "Actrice");
MappedJobs.set("director", "Directeur");
MappedJobs.set("writer", "Scénariste");
MappedJobs.set("producer", "Producteur");

var MappedCategories = new Map();
MappedCategories.set('Action', 'Action');
MappedCategories.set('Adult', 'Adulte');
MappedCategories.set('Adventure', 'Aventure');
MappedCategories.set('Animation', 'Animation');
MappedCategories.set('Biography', 'Biographie');
MappedCategories.set('Comedy', 'Comédie');
MappedCategories.set('Crime', 'Crime');
MappedCategories.set('Documentary', 'Documentaire');
MappedCategories.set('Drama', 'Drame');
MappedCategories.set('Family', 'Famillial');
MappedCategories.set('Fantasy', 'Fantaisie');
MappedCategories.set('Film-Noir', 'Film-Noir');
MappedCategories.set('Game-Show', 'Jeu télévisé');
MappedCategories.set('History', 'Histoire');
MappedCategories.set('Horror', 'Horreur');
MappedCategories.set('Music', 'Musique');
MappedCategories.set('Musical', 'Musical');
MappedCategories.set('Mystery', 'Intrigue');
MappedCategories.set('News', 'Reportage');
MappedCategories.set('Reality-TV', 'Télé-Réalité');
MappedCategories.set('Romance', 'Romance');
MappedCategories.set('Sci-Fi', 'Science-Fiction');
MappedCategories.set('Short', 'Court-Métrage');
MappedCategories.set('Sport', 'Sport');
MappedCategories.set('Talk-Show', 'Emission-Débat');
MappedCategories.set('Thriller', 'Thriller');
MappedCategories.set('War', 'Guerre');
MappedCategories.set('Western', 'Western');



const TraductionService = {

    translateJobs(jobs) {
        MappedJobs.forEach((value, key) => {
            jobs = jobs.replace(key, value);
        });

        return jobs;
    },

    translateCategorie(cat) {
        MappedCategories.forEach((value, key) => {
            cat = cat.replace(key, value);
        });

        return cat;
    }

};

export default TraductionService;