import {
  createElement,
  forwardRef,
  ReactNode,
  ReactHTML,
  AllHTMLAttributes,
} from "react";

/**
 * Dynamically filter classNames
 *
 * Usage example:
 *
 * <button
 *   className={cx(
 *     "this is always applied",
 *     isTruthy && "this only when the isTruthy is truthy",
 *     active ? "active classes" : "inactive classes"
 *   )}
 * >
 *   Text
 * </button>;
 **/
export const cx = (...classes: (false | null | undefined | string)[]) => {
  return classes.filter(Boolean).join(" ");
};

/**
 * React element factory with base tailwind styles
 *
 * Usage example:
 *
 * const Text = tw("p")`text-base text-gray-800`;
 *
 * <Text>Hello</Text>;
 * <Text as="span">Hello</Text>;
 * <Text className="mb-4">Hello</Text>;
 **/
export const tw = (tag: Tag) => {
  return (baseClassName: TemplateStringsArray) => {
    const Component = forwardRef<Ref, ComponentProps>(
      ({ as = tag, className = "", children, ...rest }, ref) => {
        const cxn = cx(...baseClassName, className);
        return createElement(as, { ref, className: cxn, ...rest }, children);
      }
    );

    Component.displayName = `tw(${tag})`;

    return Component;
  };
};

tw.a = tw("a");
tw.abbr = tw("abbr");
tw.address = tw("address");
tw.area = tw("area");
tw.article = tw("article");
tw.aside = tw("aside");
tw.audio = tw("audio");
tw.b = tw("b");
tw.base = tw("base");
tw.bdi = tw("bdi");
tw.bdo = tw("bdo");
tw.big = tw("big");
tw.blockquote = tw("blockquote");
tw.body = tw("body");
tw.br = tw("br");
tw.button = tw("button");
tw.canvas = tw("canvas");
tw.caption = tw("caption");
tw.cite = tw("cite");
tw.code = tw("code");
tw.col = tw("col");
tw.colgroup = tw("colgroup");
tw.data = tw("data");
tw.datalist = tw("datalist");
tw.dd = tw("dd");
tw.del = tw("del");
tw.details = tw("details");
tw.dfn = tw("dfn");
tw.dialog = tw("dialog");
tw.div = tw("div");
tw.dl = tw("dl");
tw.dt = tw("dt");
tw.em = tw("em");
tw.embed = tw("embed");
tw.fieldset = tw("fieldset");
tw.figcaption = tw("figcaption");
tw.figure = tw("figure");
tw.footer = tw("footer");
tw.form = tw("form");
tw.h1 = tw("h1");
tw.h2 = tw("h2");
tw.h3 = tw("h3");
tw.h4 = tw("h4");
tw.h5 = tw("h5");
tw.h6 = tw("h6");
tw.head = tw("head");
tw.header = tw("header");
tw.hgroup = tw("hgroup");
tw.hr = tw("hr");
tw.html = tw("html");
tw.i = tw("i");
tw.iframe = tw("iframe");
tw.img = tw("img");
tw.input = tw("input");
tw.ins = tw("ins");
tw.kbd = tw("kbd");
tw.keygen = tw("keygen");
tw.label = tw("label");
tw.legend = tw("legend");
tw.li = tw("li");
tw.link = tw("link");
tw.main = tw("main");
tw.map = tw("map");
tw.mark = tw("mark");
tw.menu = tw("menu");
tw.menuitem = tw("menuitem");
tw.meta = tw("meta");
tw.meter = tw("meter");
tw.nav = tw("nav");
tw.noscript = tw("noscript");
tw.object = tw("object");
tw.ol = tw("ol");
tw.optgroup = tw("optgroup");
tw.option = tw("option");
tw.output = tw("output");
tw.p = tw("p");
tw.param = tw("param");
tw.picture = tw("picture");
tw.pre = tw("pre");
tw.progress = tw("progress");
tw.q = tw("q");
tw.rp = tw("rp");
tw.rt = tw("rt");
tw.ruby = tw("ruby");
tw.s = tw("s");
tw.samp = tw("samp");
tw.slot = tw("slot");
tw.script = tw("script");
tw.section = tw("section");
tw.select = tw("select");
tw.small = tw("small");
tw.source = tw("source");
tw.span = tw("span");
tw.strong = tw("strong");
tw.style = tw("style");
tw.sub = tw("sub");
tw.summary = tw("summary");
tw.sup = tw("sup");
tw.table = tw("table");
tw.template = tw("template");
tw.tbody = tw("tbody");
tw.td = tw("td");
tw.textarea = tw("textarea");
tw.tfoot = tw("tfoot");
tw.th = tw("th");
tw.thead = tw("thead");
tw.time = tw("time");
tw.title = tw("title");
tw.tr = tw("tr");
tw.track = tw("track");
tw.u = tw("u");
tw.ul = tw("ul");
tw.video = tw("video");
tw.wbr = tw("wbr");
tw.webview = tw("webview");

export const twc = (c: TemplateStringsArray) => c.join(" ");

export type ComponentProps = AllHTMLAttributes<HTMLOrSVGElement> & {
  children?: ReactNode;
  as?: Tag;
  className?: string;
};

export type Ref = ReactNode | HTMLElement | string;
export type Tag = keyof ReactHTML;
export type Modify<T, R> = Omit<T, keyof R> & R;
