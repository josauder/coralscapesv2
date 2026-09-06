# CoralscapesV2 Project Page

Project website for the paper **"CoralscapesV2: Panoptic and Fine-Grained Visual Scene Understanding in Coral Reefs"**, hosted at [josauder.github.io/coralscapesv2](https://josauder.github.io/coralscapesv2).

The site is a single static `index.html` built on the [Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template) (adopted from the [Nerfies](https://nerfies.github.io) project page), using [Bulma](https://bulma.io) for styling.

## Editing

- All content lives in [`index.html`](index.html).
- **Author links:** each author name is an `<a href="...">`. Search for `AUTHOR LINK` comments to paste a personal website URL for any author; leave `href="#"` if none.
- **Paper link:** currently points to the OpenReview forum. Search for `PAPER LINK` to swap in the arXiv URL once available.
- **Video:** `static/videos/banner_video_v2.mp4`. Replace with a browser-safe H.264 `.mp4` at the same path.
- **Logos:** greyscale institution logos live in `static/images/logos/`.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## License

The website template is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).
