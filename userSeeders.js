import User from "./src/Entities/Users/Modelo.js";
import faker from "faker";

const seedUsers = async () => {
    try {
        const numUsers = 10;

        Array(numUsers).fill().forEach(async () => {
            const userData = {
                name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                date: faker.date.past(),
                phone: faker.phone.phoneNumberFormat().replace(/-/g, ''),
                email: faker.internet.email(),
                nickname: faker.internet.userName(),
                password: faker.internet.password(),
              };

              await User.create(userData);

        });
        
    } catch (error) {
        console.log(error)
        throw new Error('BAD_REQUEST')
    }
}

export default seedUsers