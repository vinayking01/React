### Note-  This Project is Based on Class Component

### Feature - 

1. Fetching Data from News API
2. Spinner during loading 



## Topics

### 1. Default Props in Class Based Component
1. Default props are a way to set default values for props that are not provided by the parent component. If a prop is not passed, the default value will be used. In React class component there is a common and convenient way to define these properties using The static keyword means that these properties are attached to the class itself, not to instances of the class. Static methods are not accessible using Object .
    ```
    export default class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 10,
        category: "general",
    };

    ```
2. Setting Props type.
    ```static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    };
    ```
3. 