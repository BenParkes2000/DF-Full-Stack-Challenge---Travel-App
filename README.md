[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=14025018&assignment_repo_type=AssignmentRepo)

# Challenge 4 - Travel Info Challenge

```ascii

-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----
           . _..::__:  ,-"-"._        |7       ,     _,.__
   _.____ _<_>`!(._`.`-.    /         _._`_ ,_/  '  '-._.---.-.__
>.{     " " `-==,',._\{  \  / {)      / _ ">_,-'`                mt-2_
  \_.:--.       `._ )`^-. "'       , [_/(                       __,/-'
 '"'     \         "    _L        oD_,--'                )     /. (|
          |           ,'          _)_.\\._<> 6              _,' /  '
          `.         /           [_/_'` `"(                <'}  )
           \\    .-. )           /`-'"..' `:.#          _)  '
    `        \  (  `(           /`:\  > \  ,-^.  /' '
              `._,   ""         |           \`'   \|   ?_)  {\
                 `=.---.`._._       ,'     "`|' ,- '..
                   |    `-._         |     /          `:`<_|h--._
                   (        >        .     | ,          `=.__.`-'\
                    `.     /         |     |{|              ,-.,\     .
                     |   ,'           \   /`'            ,"     \
                     |  /              |_'                |  __  /
                     | |                                  '-'  `-'   \.
                     |/                                         "    /
                     \.                                             '

                      ,/            ______._.--._ _..---.---------._
     ,-----"-..?----_/ )      __,-'"             "                  (
-.._(                  `-----'`-
-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----
Map (C) 1998 Matthew Thomas.
```

## Introduction

DFCorp are interested in expanding their portfolio of applications that you have been developing. Their latest idea is a web-based travel information application. The initial requirement is to display a 5 day weather forecast for any searchable location with the functionality to be able to save favourite locations locally. In addition to this they have further requirements to fulfil, if you have time, with these being a map of the local area and a slide show of local hotels. They hope that this will encourage the users of their current apps to use this service and see potential for integration into other apps that they have in design.

> Before proceeding, ensure that you have a solid understanding of why a user needs this software and the benefits that it will bring to them (See Task 1).

## Core Features

The Business Analyst team working with DFCorp has identified the following features that should be implemented:

- The user should see a location search box when they access the application home page that allows them to search any town or city by name (as per the wireframe supplied)
- The application should send a query to a weather API to get a 5-day forecast if the location can be found
- When the forecast data is returned, a new view should be displayed, using the wireframe(s) for the view layout
- The user should be able to save a location as a favourite (although this should only persist on the device they are using at the time)
- The application should be responsive across the main breakpoints for devices (mobile, tablet, desktop) - wireframes are provided for each of these

The layouts are pretty much agreed with the main stakeholder but they are open for you to put your creative flair into the colour scheme and any images used (that are not specific to the location content). They are also open to suggestions for the name of the application and its logo.

> **Note:** The use of a generative AI tool to complete tasks relating to the specific requirements above is NOT allowed. All work here should be your own.

## Additional Features

In addition to these features, should time allow, the client has asked for the application to display the following on the same view as the weather (as per the wireframes):

- A map of the selected location
- A list of hotels in the selected location, displayed on a carousel that can be moved on; Hotel images should be in a slide show within the hotel's carousel.

Please see the wireframes for more information about the specific data and layout to be used to base your application on

> **Note:** The use of a generative AI tool to help complete tasks relating to these further requirements is allowed but should be clearly documented.

---

## Tasks

1. From the requirements listed above, devise a set of user stories that describe the functionality that the client has requested
2. From the wireframes and the user stories, devise a component hierarchy that will help in the construction of the web application and explain your reasoning for this hierarchy
   - When you have made your static application, add your "state" planning indicating why you have chosen to hold state in that specific component
   - Answering the 3 state questions here would help!
3. Create the application using the "Thinking in React" strategy and creating tests for any logic that will affect the user's experience
4. Once you have completed your application, write a document that makes suggestions for further development of the application, including any potential integration with other DFCorp applications and external APIs:
   - This should include a description of the potential benefits of these integrations or additional APIs, how they could be implemented and the potential risks of these integrations

Ensure that the application that you submit will run in the development environment (using `npm run dev` command).

---

## Tips

- Commit regularly to GitHub with clear commit messages - write a failing test, pass the test, commit, etc
- You should put your component hierarchies, state identification notation and test plans in the markdown file in the `docs` folder, if you decide to use some form of Scrum board to track your progress, you should include a screenshot of this in the markdown file
- Structure your `src` folder with suitable sub-folders to help identify groups of components

---

## APIs

The following APIs can be used in this project. Be mindful of any request limits and DO NOT use any APIs that require billing information.

---

### Weather API

For weather information, you can use the free **_OpenWeatherMap_** API by signing up for a free developer key - select the **_FREE_** tier here:

[https://openweathermap.org/price](https://openweathermap.org/price)

Once you have your API key, you can use the following fetch or Axios request to obtain the weather data for a location:

```javascript
const response = await axios.get(
  `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=<YOUR API KEY>`
);
setWeatherData(response.data);
```

The data returned will be in JSON format and will contain a list of weather data for the next 5 days. You will need to parse this data and display it in a suitable format on the page.

An example of the returned weather data can be found in the `data` folder of this repository.

#### Further Helper Code

<details>
The following code will help you extract the weather data returned from the API:

```javascript
const updateState = (data) => {
  const tempDays = [];
  const dayIndices = getDayIndices(data);

  for (let i = 0; i < 5; i++) {
    const currentData = data.list[dayIndices[i]];
    tempDays.push({
      date: currentData.dt_txt,
      weather_desc: currentData.weather[0].description,
      icon: currentData.weather[0].icon,
      temp: currentData.main.temp,
    });
  }
  return tempDays;
};
// returns array with Indices of the next five days in the list from the API data (every day at 12:00 pm)
const getDayIndices = (data) => {
  let dayIndices = [0];
  let currentDay = data.list[0].dt_txt.slice(8, 10);

  for (let i = 1; i < data.list.length; i++) {
    let day = data.list[i].dt_txt.slice(8, 10);
    let hour = data.list[i].dt_txt.slice(11, 13);

    if (day !== currentDay && hour === "15") {
      dayIndices.push(i);
      currentDay = day;

      // Stop after finding 4 different days
      if (dayIndices.length === 5) {
        break;
      }
    }
  }
  return dayIndices;
};
const days = updateState(data);

const weatherBoxes = days
  .slice(1)
  .map((day) => <WeatherBox {...day} key={new Date(day.date).getDay()} />);
```

> `WeatherBox` is a component that displays weather data for a single day (as per the small weather box in the wireframe).
> `weatherBoxes` maps the array of days found by calling `updateState` (and subsequently `getDayIndicies`) in to an array of the `WeatherBox` components for each day.

#### Using the Weather Icons

Inspecting the return from the weather API, you will see that a number of icons can be referenced as shown in this excerpt from the dummy data file in the `data` folder of this repository:

```json
{
  "weather": [
    {
      "id": 804,
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04d"
    }
  ]
}
```

The `icon` property can be used to reference the appropriate icon for the weather condition. You can use the following `src` property in an `img` to display the icon in your application:

```JSX
<img src={`/assets/weather-icons/${weather[0].icon}.svg`}>
```

The `/assets/weather-icons` folder is in the `public` folder of your application and contains the icons that you need to display the weather conditions supplied by the API call. This is the correct way to use dynamic images inside a React application scaffolded with Vite.

</details>

---

### Maps API

For maps use the free **_TomTom_** API by signing up for a free developer key:

[https://developer.tomtom.com/](https://developer.tomtom.com/)

Once you have done this, you will use the **_Maps SDK_** web functionality to render a map based on the _Longitude_ and _Latitude_ of the location you want to display. These are available from the data that comes from the initial weather search for the location.

This [page](https://developer.tomtom.com/blog/build-different/adding-tomtom-maps-modern-react-app/) gives you a tutorial on how to add a TomTom map to your website, although it isn't very clear. This component code puts a map on the page and is a good starting point:

```javascript
import { useRef } from 'react';

import tt from '@tomtom-international/web-sdk-maps'; // npm i @tomtom-international/web-sdk-maps
import "@tomtom-international/web-sdk-maps/dist/maps.css";

const Map = ({[long, lat]: center}) => {
const mapElement = useRef();

    const mapLongitude = -121.91599;
    const mapLatitude = 37.36765;
    const mapZoom = 10;
    const [map, setMap] = useState({});

    useEffect(() => {
        let map = tt.map({
            key: "<YOUR API KEY HERE>",
            container: mapElement.current,
            center: [mapLongitude, mapLatitude],
            zoom: mapZoom,
        });
        setMap(map);
        return () => map.remove();
    }, []);

    return (
        <>
            <div
                ref={mapElement}
                className="mapDiv"
                style={{ height: "500px" }} /* This height value can be set to whatever you need} */
            />
        </>
    );
}
```

> It is recommended that you create a project and get this working standalone before integrating it into your main project.

---

### Hotel API

For hotel information, you can use the free **_RapidAPI_** to access the **_[Priceline.com](https://rapidapi.com/davidtaoweiji/api/priceline-com/)_** API by signing up for a free developer key.

Once you have done this, you can use the following fetch or Axios request to obtain the hotel data for a location:

```javascript
const options = {
  method: "GET",
  url: "https://priceline-com.p.rapidapi.com/hotels/city/search",
  params: { q: "Dublin US" },
  headers: {
    "X-RapidAPI-Key": "<YOUR KEY HERE>",
    "X-RapidAPI-Host": "priceline-com.p.rapidapi.com",
  },
};

try {
  const response = await axios.request(options);
  console.log(response.data);
} catch (error) {
  console.error(error);
}
```

You can then break the response object down to get the hotel data that you need to display in the carousel.

An example of hotel data can be seen in the file `dummyHotelData.json` in the `data` folder of this repository.

---

## Wireframes

The wireframes for the application can be found in the following Miro board:

[Travel Info Challenge Wireframes](https://miro.com/app/board/uXjVNryPC9E=/?share_link_id=354675864218)

On this board, you will find wireframes for a mobile device, a tablet in portrait mode and a wireframe for tablets in landscape mode and larger. You should use these wireframes to help you create component hierarchies for the application.

The notes at the side of the wireframes are there to help you understand the requirements of the application and the data that should be displayed.

## Grading Criteria

### Digital Futures Software Engineering Progression Management Framework

In this Challenge, you will have the opportunity to demonstrate the following competencies from the Software Engineering Progression Management framework:

---

#### Writes software that meets a user’s functional and non-functional requirements

|               | Description                                                                                                                                                                                                                                                        | Where assessed?                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| **_Level 2_** | The engineer can code a solution that functionally and non-functionally meets requirements for a **small number** of **simple** requirements (e.g. requirements requiring multiple functions to fulfil)                                                            | Code submitted (_SOME core features implemented_ )          |
| **_Level 3_** | The engineer can code a solution that functionally and non-functionally meets requirements for **several simple** requirements                                                                                                                                     | Code submitted (_Core features fully implemented_ )         |
| **_Level 4_** | The engineer can code a solution that functionally and non-functionally meets requirements for a _small number_ of **_complex_** requirements (e.g. requirements requiring multiple functions or breaking down to fulfil)                                          | Code submitted (_some/all additional features implemented_) |
| **_Level 4_** | The engineer can code a solution that functionally and non-functionally meets requirements and can participate in group reviews of code identifying opportunities to make it more efficient and/or cleaner with the help of a Generative AI tool where appropriate | Code review issues in GitHub                                |

---

#### Can interpret business requirements into coding requirements

|               | Description                                                                                                                                                                                                                             | Where assessed?                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **_Level 1_** | The engineer can create **simple user stories** from user requirements (i.e. clearly defined story using “As a”, “Able to”, “So that” or “Given/When/Then” structure that could be solved using simple code)                            | Markdown file in `docs` folder                                                                        |
| **_Level 3_** | The engineer can create **component hierarchies** and/or apply object-oriented principles in them for **_simple_** user stories                                                                                                         | Markdown file in `docs` folder and code submitted (_Some of core features implemented_)               |
| **_Level 4_** | The engineer can create **component hierarchies** and/or apply object-oriented principles in them for **_moderately complex_** user stories (i.e. user stories that require multiple objects/domain models to fulfil)                   | Markdown file in `docs` folder and code submitted (_Core features fully implemented_)                 |
| **_Level 5_** | The engineer can create **component hierarchies** and/or apply object-oriented principles in them for **_complex_** user stories (i.e. user stories that require multiple objects/domain models and/or breaking down further to fulfil) | Markdown file in `docs` folder and code submitted (_Additional features attempted with some success_) |

---

#### Develop code through Test-Driven Development and/or Behaviour Driven Development

|               | Description                                                                                                                                                                                             | Where assessed?                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **_Level 2_** | The engineer can write **tests** and/or **working code** that demonstrates that the **TDD process** has been followed through a commit history with clear commit messages                               | Code submitted - GitHub commit history            |
| **_Level 3_** | The engineer can write **tests** and/or **working code** that pass covering the **main functionality** of the code using a standard, **third-party** testing framework                                  | Code submitted                                    |
| **_Level 3_** | The engineer can write **tests** and/or **working code** that demonstrates the use of a **Generative AI** tool to identify and write test cases and/or code for tests                                   | Code submitted and Markdown file in `docs` folder |
| **_Level 4_** | The engineer can write **tests** and/or **working code** that passes tests that cover **some edge cases** of the code **that they have identified** using a standard, **third-party** testing framework | Code submitted                                    |
| **_Level 4_** | The engineer can write **tests** and/or **working code** that demonstrates the use of a **Generative AI** tool to identify and write tests for **further edge cases**                                   | Code submitted and Markdown file in `docs` folder |
| **_Level 5_** | The engineer can write **tests** and/or **working code** that passes tests that cover most **edge cases** of the code using a standard, **third-party** testing framework                               | Code submitted and Markdown file in `docs` folder |
| **_Level 5_** | The engineer can write **tests** and/or **working code** that demonstrates the use of a **Generative AI** tool to identify and write tests for **further edge or corner cases**                         | Code submitted and Markdown file in `docs` folder |

---

#### Writes clean code

|               | Description                                                                                                                                                                                                                                                                      | Where assessed?                                   |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **_Level 2_** | The engineer can write code that is **functionally correct** using applying **some** principles of clean-coding (e.g. 5-line functions, no nested loops or conditional statements)                                                                                               | Code submitted                                    |
| **_Level 2_** | The engineer can write code that is **functionally correct** and has been made **more efficient** by a **Generative AI** tool                                                                                                                                                    | Code submitted and Markdown file in `docs` folder |
| **_Level 2_** | The engineer can write code that is **functionally correct** and has **demonstrated** the use of **Generative AI** to help within the **debugging** process                                                                                                                      | Code submitted and Markdown file in `docs` folder |
| **_Level 3_** | The engineer can write code that is **functionally correct** using applying **single responsibility** and other clean-coding practices (e.g. **abstraction**) to **some** of the classes/functions/methods and blocks of code                                                    | Code submitted                                    |
| **_Level 3_** | The engineer can write code that is **functionally correct** and can use **Generative AI** to help **refactor** code                                                                                                                                                             | Code submitted and Markdown file in `docs` folder |
| **_Level 4_** | The engineer can write code that is **functionally correct** using applying **single responsibility** and other clean-coding practices (e.g. **abstraction**) to **most** of the classes/functions/methods and blocks of code                                                    | Code submitted                                    |
| **_Level 4_** | The engineer can write code that is **functionally correct** and can use **Generative AI** to help **document their own** or the **code of others**                                                                                                                              | Code submitted and Markdown file in `docs` folder |
| **_Level 5_** | The engineer can write code that is **functionally correct** using applying **single responsibility** and other clean-coding practices (e.g. **abstraction**) to all of the classes/functions/methods and blocks of code to create **loosely-coupled**, **highly-cohesive** code | Code submitted and Markdown file in `docs` folder |

---

#### Creating User Interfaces

|               | Description                                                                                                                                                                                                         | Where assessed?                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| **_Level 1_** | The engineer can create user interfaces that show good practice in using HTML/CSS and JavaScript                                                                                                                    | Code submitted                  |
| **_Level 2_** | The engineer can create user interfaces that are built in ReactJS and following the _“Thinking in React”_ process to create **static** User Interfaces                                                              | Code submitted - tagged commits |
| **_Level 3_** | The engineer can create user interfaces that are built _and tested_ in ReactJS and following the _“Thinking in React”_ process to create **interactive** User Interfaces                                            | Code submitted - tagged commits |
| **_Level 4_** | The engineer can create user interfaces that are built _and tested_ in ReactJS and following the _“Thinking in React”_ process that use **external APIs** to send and receive data and are **routed** appropriately | Code submitted - tagged commit  |
| **_Level 5_** | The engineer can create user interfaces that are built _and tested_ in ReactJS and following the _“Thinking in React”_ process that are **routed** appropriately                                                    | Code submitted - tagged commit  |

---

## Digital Futures Professional Skills Progression Management Framework

In this Challenge, you will have the opportunity to demonstrate the following competencies from the Professional Skills Progression Management framework:

---

### Communications

|               | Description                                                                                             | Where assessed?                |
| ------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------ |
| **_Level 1_** | Can express themselves fluently in both verbal and written English                                      | Markdown file in `docs` folder |
| **_Level 1_** | Demonstrates attentive listening                                                                        | During assignment introduction |
| **_Level 2_** | Convey technical information to technical stakeholders in both verbal and written forms                 | Markdown file in `docs` folder |
| **_Level 2_** | Creates content to a professional standard that is concise, well-structured, and grammatically correct  | Markdown file in `docs` folder |
| **_Level 3_** | Articulates complex technical concepts with clarity and precision across both verbal and written forms. | Markdown file in `docs` folder |

---

### Professional Development (Assessed after submission via Self-Review)

|               | Description                                                                                          | Where assessed?                                    |
| ------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **_Level 1_** | Demonstrates ability to listen to and act on constructive feedback or new ideas from others          | SMART Goal Review                                  |
| **_Level 2_** | Constructs SMART goal based on their identified areas of improvement                                 | SMART goal review                                  |
| **_Level 2_** | Achieves a self-made SMART goal                                                                      | Previous SMART goal review                         |
| **_Level 3_** | Demonstrates consistency in achieving small to medium (<2 weeks) SMART goals (x3 goals)              | SMART Goal review                                  |
| **_Level 3_** | Provides constructive input to peers and can communicate feedback in a supportive and helpful manner | Peer review comments                               |
| **_Level 3_** | Demonstrates ability to experiment with new techniques or approaches that work best for them         | In code - Testing; In docs - Component Hierarchies |

---

### Business Awareness

|               | Description                                                                                                                                  | Where assessed?                                    |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **_Level 1_** | Recognises importance of customer/stakeholder-centricity                                                                                     | Markdown file in `docs` folder                     |
| **_Level 2_** | Applies basic requirement elicitation techniques and can gather and document simple requirements that align towards the business’ objectives | Markdown file in `docs` folder                     |
| **_Level 3_** | Creates clear project documentation detailing project objectives, approach and results                                                       | Markdown file in `docs` folder and in code files   |
| **_Level 3_** | Applies prioritisation techniques to ensure resource efficiency and project alignment within timescales and business objectives              | Markdown file in `docs` folder (Trello screenshot) |

---

### Adaptability

|               | Description                                                                                                             | Where assessed?                                  |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| **_Level 1_** | Individual may notice when processes, procedures, or tasks are altered but may not be entirely comfortable with changes | Markdown file in `docs` folder                   |
| **_Level 2_** | Understands fundamental Agile terms, such as User Stories, Scrum, Kanban, and the Agile Manifesto                       | Project files and Markdown file in `docs` folder |
| **_Level 3_** | Demonstrates experimentation with different approaches, tools, or methods                                               | Project files and Markdown file in `docs` folder |

---

## Submission

Your Challenge attempt should be submitted via commits to the forked project from GitHub Classroom. Your trainer will have supplied you with the appropriate link to do access this, you need to take no further action on this platform. To indicate that you have completed the Challenge, you should you the Assignment Submission link in the Challenge course for your Cohort on Noodle. The Progression Management Frameworks will be assessed via a marking rubric in Noodle and you will be able to see how you performed in each competency.

You are not permitted to collaborate with anyone to complete this challenge. You should complete the _Core Functionality_ using traditional skills, knowledge and understanding of software engineering and all code submitted for this should be your own. You may use a _Generative AI tool_ to help you complete the _Additional Functionality_ but this should be clearly documented.

---

## Feedback

After submission of your challenge attempt, your trainer will record and submit feedback in Noodle and/or via GitHub for comments in your code . You will then be able to view this feedback via Noodle and your GitHub account.

Your trainer will also provide general feedback to the cohort via the Discord channel.

---

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/3Kt2mT46)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=14249820&assignment_repo_type=AssignmentRepo)

# Challenge 5 - Travel Info Backend Challenge

```ascii

-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----
           . _..::__:  ,-"-"._        |7       ,     _,.__
   _.____ _<_>`!(._`.`-.    /         _._`_ ,_/  '  '-._.---.-.__
>.{     " " `-==,',._\{  \  / {)      / _ ">_,-'`                mt-2_
  \_.:--.       `._ )`^-. "'       , [_/(                       __,/-'
 '"'     \         "    _L        oD_,--'                )     /. (|
          |           ,'          _)_.\\._<> 6              _,' /  '
          `.         /           [_/_'` `"(                <'}  )
           \\    .-. )           /`-'"..' `:.#          _)  '
    `        \  (  `(           /`:\  > \  ,-^.  /' '
              `._,   ""         |           \`'   \|   ?_)  {\
                 `=.---.`._._       ,'     "`|' ,- '..
                   |    `-._         |     /          `:`<_|h--._
                   (        >        .     | ,          `=.__.`-'\
                    `.     /         |     |{|              ,-.,\     .
                     |   ,'           \   /`'            ,"     \
                     |  /              |_'                |  __  /
                     | |                                  '-'  `-'   \.
                     |/                                         "    /
                     \.                                             '

                      ,/            ______._.--._ _..---.---------._
     ,-----"-..?----_/ )      __,-'"             "                  (
-.._(                  `-----'`-
-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----
Map (C) 1998 Matthew Thomas.
```

## Introduction

After running the Travel Info Web Application without any backend services other than the direct API calls for a few weeks, DFCorp have received feedback from their users that the application could be improved to make it more personalised to them. In response to this, DFCorp have decided to commission you to build a set of backend services that will allow the Travel Info Web Application to have individual users and for them to be able to use their favourite locations for use across any device they log in on.

> Before proceeding, ensure that you have a solid understanding of why a user needs this software and the benefits that it will bring to them (See Task 1).

## Core Features

The Business Analyst team working with the Product Owner at DFCorp have identified the following core features that the backend services should provide:

1. **User Authentication**:
   - The web application will send registration details to a backend service to create a new user account
   - The web application will send login details to the backend service to authenticate a user
   - The web application will send a password change request to the backend service and update the user's password
   - A user must be authenticated on every subsequent request to any other backend service
2. **Favourite Locations**:
   - The web application will send a request to a backend service to obtain the stored favourite locations of an authenticated user
   - The web application will send a request to add a new location to an authenticated user's favourite locations
   - The web application will send a request to remove a location from an authenticated user's favourite locations

You may architect the backend services in any way you see fit. Authentication can be handled through a simple check of username/password on each request but more efficient and secure methods are encouraged. The storage of user data and favourite locations can be done in any way you see fit but must be held in a MongoDB database.

> **Note:** The use of a generative AI tool to complete tasks relating to the specific requirements above is NOT allowed. All work here should be your own.

## Additional Features

DFCorp have been made aware that inserting API keys into frontend applications can leave their accounts open to abuse. To counter this, they have asked that you create proxy services that will allow the frontend application to make requests to the backend services without exposing the API keys.

They are also concerned that an industry standard method of authentication is not being used and have asked that you implement JSON Web Token (JWT) authentication for the backend services.

The Product Owner at DFCorp has also identified a number of additional features that they would like to see in the backend services if time should allow you:

1. **JSON Web Token Authentication**:
   - Once a user has logged in, a JSON Web Token (JWT) should be returned to the web application and used for all subsequent requests
2. **Proxy Services**:
   - Weather API Proxy Service:
     - The web application will send a request to the backend service to obtain weather information for a location using the weather API and its key used in the frontend application and it will be responsible for returning the data to the web application (in JSON format)
   - **Map API Proxy Service**:
     - The TomTom API used allows you to set a whitelist of domains that can access the API - this means a proxy is not needed as the domain for the web application can be used and key exposure is not a concern
   - **Hotel API Proxy Service**:
     - The web application will send a request to the backend service to obtain hotel information for a location using the hotel API and its key used in the frontend application and it will be responsible for returning the data to the web application (in JSON format)

> **Note:** The use of a generative AI tool to help complete tasks relating to these further requirements is allowed but should be clearly documented.

---

## Tasks

1. Explain why the customer needs the backend services and the benefits that it will bring to them. You should include the following in your explanation:
   - The problems that the backend services will solve
   - The benefits that the backend services will bring to the user
   - The impact that the backend services will have on the customer's business
2. From the requirements listed above, devise a set of user stories that describe the functionality that the client has requested
3. Create a set of routing diagrams that show how the backend services will be accessed by the frontend application
4. Create the application using a test-driven development (TDD) approach and the NodeJS/Express/MongoDB stack
5. Create a set of tests that validate the functionality of the backend services using POSTMAN

### Bonus Task (Strictly optional but would be great!)

Can you deploy the frontend and backend to cloud services such as Netlify and Render and implement a cloud-based database?

If you can, provide links to your deployed applications and databases in the markdown file in the `docs` folder. This should include a **username** and **password** that can be used to test the deployment.

---

## Tips

- Commit regularly to GitHub with clear commit messages - write a failing test, pass the test, commit, etc
- You should put your component hierarchies, state identification notation and test plans in the markdown file in the `docs` folder, if you decide to use some form of Scrum board to track your progress, you should include a screenshot of this in the markdown file
- Structure your `src` folder with suitable sub-folders to help identify groups of components

---

## APIs

The following APIs can be used in this project. Be mindful of any request limits and DO NOT use any APIs that require billing information.

---

### Weather API

For weather information, you can use the free **_OpenWeatherMap_** API by signing up for a free developer key - select the **_FREE_** tier here:

[https://openweathermap.org/price](https://openweathermap.org/price)

Once you have your API key, you can use the following fetch or Axios request to obtain the weather data for a location:

```javascript
const response = await axios.get(
  `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=<YOUR API KEY>`
);
setWeatherData(response.data);
```

> You can then simply return the `response.data` to the frontend application.

---

### Hotel API

For hotel information, you can use the free **_RapidAPI_** to access the **_[Priceline.com](https://rapidapi.com/davidtaoweiji/api/priceline-com/)_** API by signing up for a free developer key.

Once you have done this, you can use the following fetch or Axios request to obtain the hotel data for a location:

```javascript
const options = {
  method: "GET",
  url: "https://priceline-com.p.rapidapi.com/hotels/city/search",
  params: { q: "Dublin US" },
  headers: {
    "X-RapidAPI-Key": "<YOUR KEY HERE>",
    "X-RapidAPI-Host": "priceline-com.p.rapidapi.com",
  },
};

try {
  const response = await axios.request(options);
  console.log(response.data);
} catch (error) {
  console.error(error);
}
```

> You can then simply return the `response.data` to the frontend application.

---

## Grading Criteria

## Digital Futures Software Engineering Progression Management Framework

In this Challenge, you will have the opportunity to demonstrate the following competencies from the Software Engineering Progression Management framework:

---

### Writes software that meets a user’s functional and non-functional requirements

|               | Description                                                                                                                                                                                                                                                        | Where assessed?                                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| **_Level 3_** | The engineer can code a solution that functionally and non-functionally meets requirements for **several simple** requirements                                                                                                                                     | Code submitted (_Core features fully implemented_ )                    |
| **_Level 3_** | The engineer can write code that is **functionally correct** and can use **Generative AI** to help **refactor** code                                                                                                                                               | Code submitted and Markdown file in `docs` folder                      |
| **_Level 4_** | The engineer can code a solution that functionally and non-functionally meets requirements for a _small number_ of **_complex_** requirements (e.g. requirements requiring multiple functions or breaking down to fulfil)                                          | Code submitted (_some/all additional features implemented_)            |
| **_Level 4_** | The engineer can code a solution that functionally and non-functionally meets requirements and can participate in group reviews of code identifying opportunities to make it more efficient and/or cleaner with the help of a Generative AI tool where appropriate | Code review issues in GitHub                                           |
| **_Level 5_** | The engineer can code a solution that functionally and non-functionally meets requirements for a **number** of **complex** requirements                                                                                                                            | Code structure - separate servers for authentication and functionality |

---

### Can interpret business requirements into coding requirements

|               | Description                                                                                                                                                                                                  | Where assessed?                |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------ |
| **_Level 1_** | The engineer can create **simple user stories** from user requirements (i.e. clearly defined story using “As a”, “Able to”, “So that” or “Given/When/Then” structure that could be solved using simple code) | Markdown file in `docs` folder |

| **_Level 3_** | The engineer can create **routing diagrams** and/or apply object-oriented principles in them for **_simple_** user stories | Markdown file in `docs` folder and code submitted (_Some of core features implemented_) |
| **_Level 4_** | The engineer can create **routing diagrams** and/or apply object-oriented principles in them for **_moderately complex_** user stories (i.e. user stories that require multiple objects/domain models to fulfil) | Markdown file in `docs` folder and code submitted (_Core features fully implemented_) |
| **_Level 5_** | The engineer can create **routing diagrams** and/or apply object-oriented principles in them for **_complex_** user stories (i.e. user stories that require multiple objects/domain models and/or breaking down further to fulfil) | Markdown file in `docs` folder and code submitted (_Additional features attempted with some success_) |

---

### Develop code through Test-Driven Development and/or Behaviour Driven Development

|               | Description                                                                                                                                                                                             | Where assessed?                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **_Level 2_** | The engineer can write **tests** and/or **working code** that demonstrates that the **TDD process** has been followed through a commit history with clear commit messages                               | Code submitted - GitHub commit history            |
| **_Level 3_** | The engineer can write **tests** and/or **working code** that pass covering the **main functionality** of the code using a standard, **third-party** testing framework                                  | Code submitted                                    |
| **_Level 3_** | The engineer can write **tests** and/or **working code** that demonstrates the use of a **Generative AI** tool to identify and write test cases and/or code for tests                                   | Code submitted and Markdown file in `docs` folder |
| **_Level 4_** | The engineer can write **tests** and/or **working code** that passes tests that cover **some edge cases** of the code **that they have identified** using a standard, **third-party** testing framework | Code submitted                                    |
| **_Level 4_** | The engineer can write **tests** and/or **working code** that demonstrates the use of a **Generative AI** tool to identify and write tests for **further edge cases**                                   | Code submitted and Markdown file in `docs` folder |
| **_Level 5_** | The engineer can write **tests** and/or **working code** that passes tests that cover most **edge cases** of the code using a standard, **third-party** testing framework                               | Code submitted and Markdown file in `docs` folder |
| **_Level 5_** | The engineer can write **tests** and/or **working code** that demonstrates the use of a **Generative AI** tool to identify and write tests for **further edge or corner cases**                         | Code submitted and Markdown file in `docs` folder |

---

### Writes clean code

|               | Description                                                                                                                                                                                                                                                                      | Where assessed?                                   |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **_Level 2_** | The engineer can write code that is **functionally correct** using applying **some** principles of clean-coding (e.g. 5-line functions, no nested loops or conditional statements)                                                                                               | Code submitted                                    |
| **_Level 2_** | The engineer can write code that is **functionally correct** and has been made **more efficient** by a **Generative AI** tool                                                                                                                                                    | Code submitted and Markdown file in `docs` folder |
| **_Level 2_** | The engineer can write code that is **functionally correct** and has **demonstrated** the use of **Generative AI** to help within the **debugging** process                                                                                                                      | Code submitted and Markdown file in `docs` folder |
| **_Level 3_** | The engineer can write code that is **functionally correct** using applying **single responsibility** and other clean-coding practices (e.g. **abstraction**) to **some** of the classes/functions/methods and blocks of code                                                    | Code submitted                                    |
| **_Level 3_** | The engineer can write code that is **functionally correct** and can use **Generative AI** to help **refactor** code                                                                                                                                                             | Code submitted and Markdown file in `docs` folder |
| **_Level 4_** | The engineer can write code that is **functionally correct** using applying **single responsibility** and other clean-coding practices (e.g. **abstraction**) to **most** of the classes/functions/methods and blocks of code                                                    | Code submitted                                    |
| **_Level 4_** | The engineer can write code that is **functionally correct** and can use **Generative AI** to help **document their own** or the **code of others**                                                                                                                              | Code submitted and Markdown file in `docs` folder |
| **_Level 5_** | The engineer can write code that is **functionally correct** using applying **single responsibility** and other clean-coding practices (e.g. **abstraction**) to all of the classes/functions/methods and blocks of code to create **loosely-coupled**, **highly-cohesive** code | Code submitted and Markdown file in `docs` folder |

---

### Creates Backend Services meeting requirements

|               | Description                                                                                                                                                           | Where assessed? |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| **_Level 1_** | The engineer can create backend service that can handle **simple requests** with **simple responses**                                                                 | Code submitted  |
| **_Level 2_** | The engineer can create backend service that can handle **different request types** to the same route, **send appropriate responses** and have logic that is tested   | Code submitted  |
| **_Level 3_** | The engineer can create backend service that can handle **different request types** to similar routes and **interface** with a **database**                           | Code submitted  |
| **_Level 3_** | The engineer can create backend service that can send **appropriate responses** that are **tested**                                                                   | Code submitted  |
| **_Level 4_** | The engineer can create backend service that can handle **different request types** to similar routes, carrying out _validation_ and _verification_ of _request data_ | Code submitted  |
| **_Level 4_** | The engineer can create backend service that return **response objects** with _appropriate status codes_ and _data_ using a **service-controller** architecture       | Code submitted  |
| **_Level 5_** | The engineer can create backend service that can handle and **_authenticate_** requests to **complex** routes                                                         | Code submitted  |

---

## Digital Futures Professional Skills Progression Management Framework

In this Challenge, you will have the opportunity to demonstrate the following competencies from the Professional Skills Progression Management framework:

---

### Communications

|               | Description                                                                                             | Where assessed?                |
| ------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------ |
| **_Level 1_** | Can express themselves fluently in both verbal and written English                                      | Markdown file in `docs` folder |
| **_Level 1_** | Demonstrates attentive listening                                                                        | During assignment introduction |
| **_Level 2_** | Convey technical information to technical stakeholders in both verbal and written forms                 | Markdown file in `docs` folder |
| **_Level 2_** | Creates content to a professional standard that is concise, well-structured, and grammatically correct  | Markdown file in `docs` folder |
| **_Level 3_** | Articulates complex technical concepts with clarity and precision across both verbal and written forms. | Markdown file in `docs` folder |

---

### Business Awareness

|               | Description                                                                                                                                  | Where assessed?                                    |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **_Level 1_** | Recognises importance of customer/stakeholder-centricity                                                                                     | Markdown file in `docs` folder                     |
| **_Level 2_** | Applies basic requirement elicitation techniques and can gather and document simple requirements that align towards the business’ objectives | Markdown file in `docs` folder                     |
| **_Level 3_** | Creates clear project documentation detailing project objectives, approach and results                                                       | Markdown file in `docs` folder and in code files   |
| **_Level 3_** | Applies prioritisation techniques to ensure resource efficiency and project alignment within timescales and business objectives              | Markdown file in `docs` folder (Trello screenshot) |

---

### Professional Development (Assessed after submission via Self-Review)

|               | Description                                                                                          | Where assessed?                                    |
| ------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **_Level 1_** | Demonstrates ability to listen to and act on constructive feedback or new ideas from others          | SMART Goal Review                                  |
| **_Level 2_** | Constructs SMART goal based on their identified areas of improvement                                 | SMART goal review                                  |
| **_Level 2_** | Achieves a self-made SMART goal                                                                      | Previous SMART goal review                         |
| **_Level 3_** | Demonstrates consistency in achieving small to medium (<2 weeks) SMART goals (x3 goals)              | SMART Goal review                                  |
| **_Level 3_** | Provides constructive input to peers and can communicate feedback in a supportive and helpful manner | Peer review comments                               |
| **_Level 3_** | Demonstrates ability to experiment with new techniques or approaches that work best for them         | In code - Testing; In docs - Component Hierarchies |

---

### Adaptability

|               | Description                                                                                                             | Where assessed?                                  |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| **_Level 1_** | Individual may notice when processes, procedures, or tasks are altered but may not be entirely comfortable with changes | Markdown file in `docs` folder                   |
| **_Level 1_** | Demonstrates openness to making minor-in-scope adjustments to their plans and tasks in response to changes              | Markdown file in `docs` folder                   |
| **_Level 2_** | Understands fundamental Agile terms, such as User Stories, Scrum, Kanban, and the Agile Manifesto                       | Project files and Markdown file in `docs` folder |
| **_Level 3_** | Demonstrates experimentation with different approaches, tools, or methods                                               | Project files and Markdown file in `docs` folder |

---

## Submission

Your Challenge attempt should be submitted via commits to the forked project from GitHub Classroom. Your trainer will have supplied you with the appropriate link to do access this, you need to take no further action on this platform. To indicate that you have completed the Challenge, you should you the Assignment Submission link in the Challenge course for your Cohort on Noodle. The Progression Management Frameworks will be assessed via a marking rubric in Noodle and you will be able to see how you performed in each competency.

You are not permitted to collaborate with anyone to complete this challenge. You should complete the _Core Functionality_ using traditional skills, knowledge and understanding of software engineering and all code submitted for this should be your own. You may use a _Generative AI tool_ to help you complete the _Additional Functionality_ but this should be clearly documented.

---

## Feedback

After submission of your challenge attempt, your trainer will record and submit feedback in Noodle and/or via GitHub for comments in your code . You will then be able to view this feedback via Noodle and your GitHub account.

Your trainer will also provide general feedback to the cohort via the Discord channel.

---
