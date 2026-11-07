import type { ComponentProps } from "react";

import { Slot } from "radix-ui";

import type { VariantProps } from "@utils/tv";

import { cardVariants } from "./card.styles";

const { root, header, title, description, action, content, footer } = cardVariants();

type CardProps = ComponentProps<"div"> &
  VariantProps<typeof cardVariants> & {
    /** Render the child element (e.g. <li>, <article>, <a>) with the card's styles. */
    asChild?: boolean;
  };

/*
 * A surface that groups related content. Every part is optional. With asChild on a link,
 * the whole card is clickable and gets hover and focus states; don't put other links or
 * buttons inside one.
 */
export function Card({ size = "md", asChild = false, className, ...props }: CardProps) {
  const Component = asChild ? Slot.Root : "div";

  const cardClasses = root({ size, className });

  return (
    <Component data-slot="card" data-size={size} className={cardClasses} {...props} />
  );
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  const headerClasses = header({ className });

  return <div data-slot="card-header" className={headerClasses} {...props} />;
}

/*
 * Plain text, so cards stay out of the page outline. If one belongs there, put a heading
 * of the right level inside: <CardTitle><h3>Pricing</h3></CardTitle>.
 */
export function CardTitle({ className, ...props }: ComponentProps<"div">) {
  const titleClasses = title({ className });

  return <div data-slot="card-title" className={titleClasses} {...props} />;
}

export function CardDescription({ className, ...props }: ComponentProps<"div">) {
  const descriptionClasses = description({ className });

  return <div data-slot="card-description" className={descriptionClasses} {...props} />;
}

export function CardAction({ className, ...props }: ComponentProps<"div">) {
  const actionClasses = action({ className });

  return <div data-slot="card-action" className={actionClasses} {...props} />;
}

export function CardContent({ className, ...props }: ComponentProps<"div">) {
  const contentClasses = content({ className });

  return <div data-slot="card-content" className={contentClasses} {...props} />;
}

export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  const footerClasses = footer({ className });

  return <div data-slot="card-footer" className={footerClasses} {...props} />;
}
