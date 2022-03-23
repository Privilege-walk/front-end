// Validate input data before sending. if invalid post request should not be sent.
// username: field cannot be empty.
// password: field cannot be empty. has to be more than 8 characters
// first_name: field cannot be empty.
// Last name: field cannot be empty.
// Email: field cannot be empty, has to have @ sign.


// successful creation. should show some output on the frontend.
// username exists
// Email exists.
import SignupForm from '../SignupForm';

const setup = () => {
    let utils;
    act (() => {
        utils = render(<SignupForm />);
    }); 
    let data = {
        "username": "user1",
        "password": "password1",
        "firstName": "Jane",
        "lastName": "Doe",
        "email": "jane.doe@privilegewalk.com"
    }
    let inputs = {};
    for(let key in data.keys()){
        inputs[key] = screen.getByLabelText(key);
    }
    const signupBtn = screen.getByText('Sign Up', {selector: 'button'});
    return {
        data,
        inputs,
        signupBtn,
        ...utils
    }
}

test('renders without crashing',  ()=> {
    const utils = setup(); 
    const { asFragment, inputs } = utils;
    expect(asFragment()).toMatchSnapshot();
    for(let key in inputs.keys()){
        expect(inputs[key].value).toBe('');
    }
});

test('Successful sign up', () => {
    const utils = setup(); 
    const { inputs, data, signupBtn } = utils;
    var mock = new MockAdapter(axios);
    mock.onPost(
        'http://localhost:8000/auth/login/', 
        data
    ).reply(200, {created: "success"});

    for(let key in inputs.keys()){
        fireEvent.change(inputs[key], {target: {value: data[key]}});
    }

    await act(async () => {   
        await fireEvent.click(signupBtn);
    });
})

