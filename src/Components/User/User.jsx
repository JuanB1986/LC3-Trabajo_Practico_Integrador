import PropTypes from 'prop-types';
import UserItem from '../UserItem/UserItem';

const User = ({ users, onUserUpdate  }) => {
    return (
        <div>
            {users.map((user) => (
                <UserItem
                    key={user.dni}
                    userId={user.userId}
                    name={user.name}
                    lastName={user.lastName}
                    dni={user.dni}
                    phoneNumber={user.phoneNumber}
                    email={user.email}
                    role={user.role}
                    onUserUpdate={onUserUpdate}
                />
            ))}
        </div>
    )
}

User.propTypes = {
    users: PropTypes.array.isRequired,
    onUserUpdate: PropTypes.func.isRequired,
}

export default User