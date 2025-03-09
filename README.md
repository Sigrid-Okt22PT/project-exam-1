# Outdoor Adventures
![image](https://sigrid-project-exam.netlify.app/assets/images/mainpage_screencapture.png)

View the website at https://sigrid-project-exam.netlify.app/

## Description

Welcome to the Outdoor Adventures website repository! This project showcases adventures out in the unknown. The website is built using HTML, CSS, and JavaScript, and fetches the blogpost from a wordpress api.

## Table of Contents

- [Description](#description)
- [Table of Contents](#table-of-contents)
- [Built With](#built-with)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Changing the WordPress API Endpoint](#Changing-the-WordPress-API-Endpoint)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)


## Built With

- ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) Markup language for structuring the content.
- ![CSS](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) Stylesheet language for designing the website.
- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) Programming language for adding interactivity.
- **Font Awesome:** Icon library for adding icons.


## Setup and Installation

To set up and run this project locally, follow these steps:

1. **Clone the repository:**
    ```sh
    git clone https://github.com/Sigrid-Okt22PT/project-exam-1.git
    ```

2. **Navigate to the project directory:**
    ```sh
    cd project-exam-1
    ```

3. **Open the project in your favorite code editor:**

4. **Start a local server to view the website:**
    - You can use extensions like Live Server in Visual Studio Code.

## Usage

To use this website, simply open the `index.html` file in your web browser. You can customize the content, images, and styles to suit your needs.

## Changing the WordPress API Endpoint

If you want to use a different WordPress API endpoint for fetching blog posts and media, you can update the `url` variable in the JavaScript code. Follow these steps to make the necessary changes:

1. **Locate the JavaScript file**:
    - Open the JavaScript file where the API functions are defined (e.g., `script.js`).

2. **Update the `url` variable**:
    - Find the `url` variable at the top of the file. It should look something like this:
    ```javascript
    const url = "https://yoursite.com/wp-json/wp/v2/";
    ```

3. **Replace the existing URL with the new API endpoint**:
    - Change the URL to the new WordPress API endpoint. For example, if your new WordPress site is hosted at `https://yoursite.com`, update the `url` variable as follows:
    ```javascript
    const url = "https://yoursite.com/wp-json/wp/v2/";
    ```

4. **Save the changes**:
    - Save the JavaScript file after updating the `url` variable.

5. **Test the changes**:
    - Open your website in a web browser and verify that the blog posts and media are being fetched from the new API endpoint.

By following these steps, you can easily switch to a different WordPress API endpoint for fetching blog posts and media. If you encounter any issues, double-check the API URL and ensure that the new WordPress site has the REST API enabled.


## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. **Fork the repository:**
    - Click the "Fork" button on the top right of this repository page.

2. **Clone your forked repository:**
    ```sh
    git clone https://github.com/Sigrid-Okt22PT/project-exam-1.git
    ```

3. **Create a new branch:**
    ```sh
    git checkout -b feature-branch
    ```

4. **Make your changes and commit them:**
    ```sh
    git commit -m "Add your commit message"
    ```

5. **Push to the branch:**
    ```sh
    git push origin feature-branch
    ```

6. **Create a Pull Request:**
    - Open a pull request from your forked repository to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

[My LinkedIn page](https://www.linkedin.com/in/sigrid-johanne-husev%C3%A5g-132513a5/)

