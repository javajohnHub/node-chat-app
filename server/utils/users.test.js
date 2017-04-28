const expect = require('expect');
const Users = require('./users').Users;

describe('Users', () => {
    "use strict";
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'Mike',
            room: 'Node'
        },
            {
                id: 2,
                name: 'John',
                room: 'PHP'
            },
            {
                id: 3,
                name: 'Jen',
                room: 'Node'
            }]
    });
    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'John',
            room: 'The Office'
        };
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return names for node room', () => {
        var userList = users.getUserList('Node');

        expect(userList).toEqual(['Mike', 'Jen'])
    });

    it('should return names for PHP room', () => {
        var userList = users.getUserList('PHP');

        expect(userList).toEqual(['John']);
    });

    it('should remove a user', () => {
        var removedUser = users.removeUser(1);
        expect(removedUser).toEqual({ id: 1, name: 'Mike', room: 'Node' });
    });

    it('should not remove a user', () => {
        var removedUser = users.removeUser(44);
        expect(removedUser).toNotExist();
    });

    it('should find a user', () => {
        var foundUser = users.getUser(1);
        expect(foundUser).toEqual({ id: 1, name: 'Mike', room: 'Node' });
    });

    it('should not find a user', () => {
        var foundUser = users.getUser(44);
        expect(foundUser).toNotExist();
    });
});