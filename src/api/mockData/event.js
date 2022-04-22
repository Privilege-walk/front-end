export const event = {
    name: "Perspective Walk",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting 
        industry. Lorem Ipsum has been the industry's standard dummy text ever since 
        the 1500s, when an unknown printer took a galley of type and scrambled it to 
        make a type specimen book. It has survived not only five centuries, but also 
        the leap into electronic typesetting, remaining essentially unchanged`
}


/*
Expected API data format for both host and Participant results page.
{
    barDefaultColor: str,  // (required)    - default color of the bar graphs
    data: [ // data is a sorted array. The left most item in the array will contain data for the left most bar chart 
        {
            barName: str,  (required) - This will be displayed at the bottom of a bar. Can be an empty string.
            count: number,  (required)  - The height of the bar graph.
            participantLocation: boolean (required) - This shows the location of the participant. If sending data to host this will always be false
        },
        {
            ....
        }
    ]
}
See example below
*/
const eventResults = {
    barDefaultColor: '#8884d8',
    data: [
        {
        barName: '',
        count: 2,
        participantLocation: false
        },
        {
        barName: '',
        count: 10,
        participantLocation: true // If sending data to participants, this will indicate location of participant.
        },
        {
        barName: '',
        count: 1,
        participantLocation: false
        },
        {
        barName: '',
        count: 6,
        participantLocation: false
        },
        {
        barName: '',
        count: 4,
        participantLocation: false
        },
        {
        barName: '',
        count: 2,
        participantLocation: false
        },
        {
        barName: '',
        count: 1,
        participantLocation: false
        },
    ]
};