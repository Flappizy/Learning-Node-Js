function createPerson(name) {
    const privateProperties = {};
    const person = {
        setName(name) {
            if(!name) {
                throw new Error("Person requires a name");
            }   
            privateProperties.name = name;
        },
        getName() {
            return privateProperties.name;
        }
    }
    person.setName(name);
    return person;
}