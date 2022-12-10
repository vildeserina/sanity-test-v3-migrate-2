import "../utils/styles.css"

// import getYouTubeId from "get-youtube-id"
import { PlayCircle } from "phosphor-react"
// import React from "react"
// import YouTube from 'react-youtube'

// const Preview = ({ value }) => {
//   const { url, heading } = value
//   const id = getYouTubeId(url)
//   return (
//     <div
//       style={{
//         color: "black",
//         fontSize: 16,
//         maxWidth: "200px",
//         borderColor: "#e4e4e4",
//         borderTop: 2,
//       }}
//     >
//       <h2>{heading}</h2>

//       <YouTube videoId={id} containerClassNames="youtube" />
//     </div>
//   )
// }

export const videoSection = {
  type: "object",
  name: "videoSection",
  icon: PlayCircle,
  title: "Video",
  fields: [
    // {
    //   title: "Kilde",
    //   type: "string",
    //   name: "source",
    //   options: {
    //     list: [
    //       { title: "Vimeo", value: "vimeo" },
    //       { title: "Youtube", value: "youtube" },
    //     ],
    //     layout: "radio",
    //     direction: "horizontal",
    //   },
    //   initialValue: "vimeo",
    // },
    // {
    //   name: "Vimeo ID",
    //   type: "string",
    //   name: "vimeoId",
    //   hidden: ({ parent }) => parent?.source !== "vimeo",
    // },
    {
      name: "url",
      type: "url",
      description:
        "Eksempel vimeo: https://player.vimeo.com/video/720816383?h=19827aa3aa",
      title: "Video URL",
      // hidden: ({ parent }) => parent?.source !== "youtube",
    },
  ],
  preview: {
    select: {
      source: "source",
    },
    prepare() {
      return {
        title: `Video`,
      }
    },
  },
}
