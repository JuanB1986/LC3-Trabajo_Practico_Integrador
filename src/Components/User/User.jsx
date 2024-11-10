import PropTypes from 'prop-types';
import UserItem from '../UserItem/UserItem';

const User = ({ users }) => {
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
                />
            ))}
        </div>
    )
}

User.propTypes = {
    users: PropTypes.array.isRequired,
}

export default User