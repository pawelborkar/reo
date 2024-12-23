import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Share&nbsp;</span>
          <span className={title({ color: "violet" })}>
            Files, Videos, Texts and Gifs&nbsp;
          </span>
          <br />
          <span className={title()}>from anywhere in the world</span>
          <div className={subtitle({ class: "mt-4" })}>
            Encrypted, fast and disposable.
          </div>

          <div>
            We don't store any of your data on our server once it gets expires.
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={siteConfig.links.docs}
          >
            Send Now
          </Link>
        </div>
      </section>
    </DefaultLayout>
  );
}
