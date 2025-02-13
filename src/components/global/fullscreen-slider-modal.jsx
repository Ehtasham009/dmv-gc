import * as React from "react";

import Lightbox, {
  Slide,
  StarWarsSlide,
  useLightboxState,
} from "yet-another-react-lightbox";

import { LightboxButton, Paragraph, Title } from "@/components";
import "@/styles/star-wars.css";

declare module "yet-another-react-lightbox" {
  export interface StarWarsSlide extends GenericSlide {
    type: "star-wars";
    title: string;
    subtitle: string;
    text: string[];
  }

  interface SlideTypes {
    "star-wars": StarWarsSlide;
  }
}

function isStarWarsSlide(slide: Slide): slide is StarWarsSlide {
  return slide.type === "star-wars";
}

const slides: StarWarsSlide[] = [
  {
    type: "star-wars",
    title: "Episode IV",
    subtitle: "A New Hope",
    text: [
      "It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.",
      "During the battle, Rebel spies managed to steal secret plans to the Empire’s ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet.",
      "Pursued by the Empire’s sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy….",
    ],
  },
  {
    type: "star-wars",
    title: "Episode V",
    subtitle: "The Empire Strikes Back",
    text: [
      "It is a dark time for the Rebellion. Although the Death Star has been destroyed, Imperial troops have driven the Rebel forces from their hidden base and pursued them across the galaxy.",
      "Evading the dreaded Imperial Starfleet, a group of freedom fighters led by Luke Skywalker has established a new secret base on the remote ice world of Hoth.",
      "The evil lord Darth Vader, obsessed with finding young Skywalker, has dispatched thousands of remote probes into the far reaches of space….",
    ],
  },
  {
    type: "star-wars",
    title: "Episode VI",
    subtitle: "The Return of the Jedi",
    text: [
      "Luke Skywalker has returned to his home planet of Tatooine in an attempt to rescue his friend Han Solo from the clutches of the vile gangster Jabba the Hutt.",
      "Little does Luke know that the GALACTIC EMPIRE has secretly begun construction on a new armored space station even more powerful than the first dreaded Death Star.",
      "When completed, this ultimate weapon will spell certain doom for the small band of rebels struggling to restore freedom to the galaxy….",
    ],
  },
];

function RenderStarWarsSlide({ slide }: { slide: StarWarsSlide }) {
  const index = slides.findIndex((el) => el === slide);

  const { currentIndex } = useLightboxState();

  return index === currentIndex ? (
    <div className="container">
      <div className="fade"></div>
      <div className="star-wars">
        <div className="crawl">
          <div className="title">
            <p>{slide.title}</p>
            <h1>{slide.subtitle}</h1>
          </div>
          {slide.text.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  ) : null;
}

export default function CustomSlides() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Title>Custom Slides</Title>

      <Paragraph>
        Here is an example of a text slide with CSS animation.
      </Paragraph>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        render={{
          slide: ({ slide }) =>
            isStarWarsSlide(slide) ? (
              <RenderStarWarsSlide slide={slide} />
            ) : null,
        }}
        carousel={{ preload: 1, padding: 0 }}
      />

      <LightboxButton onClick={() => setOpen(true)} />
    </>
  );
}
