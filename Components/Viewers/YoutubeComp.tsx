const YoutubeComponent = ({ url }: { url: string }) => {
  const regex = /(?:(?:v)\=)(\w+)/gm;
  const embedId = regex.exec(url);
  if (!embedId) {
    return <div>Video not found</div>;
  }
  console.log(embedId);
  return `https://www.youtube.com/embed/${embedId[1]}`;
  //     <iframe
  //       width="100%"
  //       height="403px"
  //       src={`https://www.youtube.com/embed/${embedId[1]}`}
  //       title="YouTube video player"
  //       allow="

  //   picture-in-picture;
  //  "
  //       allowFullScreen
  //     />
};

export default YoutubeComponent;
