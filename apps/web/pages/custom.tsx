import Cal from "@calcom/embed-react";

const MyComponent = () => (
  <Cal
    calOrigin="https://your-cal-instance"
    // Need to specify this because React SDK loads the embed snippet itself and it needs to know where to load the snippet from
    embedJsUrl="https://your-cal-instance/embed/embed.js"
    calLink="john"
  />
);
export default MyComponent;
