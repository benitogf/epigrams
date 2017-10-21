const something = `Minas Tirith

Pippin looked out from the shelter of Gandalf"s cloak. He wondered if he was awake or still sleeping, still in the swift-moving dream in which he had been wrapped so long since the great ride began. The dark world was rushing by and the wind sang loudly in his ears. He could see nothing but the wheeling stars, and away to his right vast shadows against the sky where the mountains of the South marched past. Sleepily he tried to reckon the times and stages of their journey, but his memory was drowsy and uncertain.

All the major Unix documentation formats except the very newest one are presentation-level markups assisted by macro packages. We examine them here from oldest to newest.
troff and the Documenter’s Workbench Tools
We discussed the Documenter’s Workbench architecture and tools in Chapter 8 as an example of how to integrate a system of multiple minilanguages. Now we return to these tools in their functional role as a typesetting system.
The troff formatter interprets a presentation-level markup language. Recent implementations like the GNU project’s groff(1) emit PostScript by default, though it is possible to get other forms of output by selecting a suitable driver. See Example 18.1 for several of the troff codes you might encounter in document sources.
Example 18.1. groff(1) markup example.
This is running text. . Comments begin with a backslash and double quote. .ft B This text will be in bold font. .ft R This text will be back in the default (Roman) font. These lines, going back to "This is running text", will be formatted as a filled paragraph. .bp The bp request forces a new page and a paragraph break. This line will be part of the second filled paragraph. .sp 3 The .sp request emits the number of blank lines given as argument
462
Chapter 18. Documentation
.nf The nf request switches off paragraph filling. Until the fi request switches it back on whitespace and layout will be preserved.
There had been the first ride at terrible speed without a halt, and then in the dawn he had seen a pale gleam of gold, and they had come to the silent town and the great empty house on the hill. And hardly had they reached its shelter when the winged shadow had passed over once again, and men wilted with fear. But Gandalf had spoken soft words to him, and he had slept in a corner, tired but uneasy, dimly aware of comings and goings and of men talking and Gandalf giving orders. And then again riding, riding in the night. This was the second, no, the third night since he had looked in the Stone. And with that hideous memory he woke fully, and shivered, and the noise of the wind became filled with menacing voices.

A light kindled in the sky, a blaze of yellow fire behind dark barriers Pippin cowered back, afraid for a moment, wondering into what dreadful country Gandalf was bearing him. He rubbed his eyes, and then he saw that it was the moon rising above the eastern shadows, now almost at the full. So the night was not yet old and for hours the dark journey would go on. He stirred and spoke.

"Where are we, Gandalf?" he asked.

One word in this line will be in bold font. .fi
Paragraph filling is back on.
troff(1) has many other requests, but you are unlikely to see most of them directly. Very few documents are written in bare troff. It supports a macro facility, and half a dozen macro packages are in more or less general use. Of these, the overwhelmingly most common is the man(7) macro package used to write Unix manual pages. See Example 18.2 for a sample.
Example 18.2. man markup example.
.SH SAMPLE SECTION The SH macro starts a section, boldfacing the section title. .P The P request starts a new paragraph. The I request sets its argument in .I italics. .IP * This starts an indented paragraph with an asterisk label. More text for the first bulleted paragraph. .TP This first line will become a paragraph label This will be the first line in the paragraph, further indented relative to the label.
The blank line just above this is treated almost exactly like a paragraph break (actually, like the troff-level request .sp 1). .SS A subsection This is subsection text.
Two of the other half-dozen historical troff macro libraries, ms(7) and mm(7) are still in use. BSD Unix has its own elaborate extended macro set, mdoc(7). All these are designed for writing technical
463
Chapter 18. Documentation
manuals and long-form documentation. They are similar in style but more elaborate than man macros, and oriented toward producing typeset output.
A minor variant of troff(1) called nroff(1) produces output for devices that can only support constantwidth fonts, like line printers and character-cell terminals. When you view a Unix manual page within a terminal window, it is nroff that has rendered it for you.
The Documenter’s Workbench tools do the technical-documentation jobs they were designed for quite well, which is why they have remained in continuous use for more than thirty years while computers increased a thousandfold in capacity. They produce typeset text of reasonable quality on imaging printers, and can throw a tolerable approximation of a formatted manual page on your screen.
They fall down badly in a couple of areas, however. Their stock selection of available fonts is limited. They don’t handle images well. It’s hard to get precise control of the positioning of text or images or diagrams within a page. Support for multilingual documents is nonexistent. There are numerous other problems, some chronic but minor and some absolute showstoppers for speciﬁc uses. But the most serious problem is that because so much of the markup is presentation level, it’s difﬁcult to make good Web pages out of unmodiﬁed troff sources.
Pippin became drowsy again and paid little attention to Gandalf telling him of the customs of Gondor, and how the Lord of the City had beacons built on the tops of outlying hills along both borders of the great range, and maintained posts at these points where fresh horses were always in readiness to bear his errand-riders to Rohan in the North, or to Belfalas in the South. "It is long since the beacons of the North were lit," he said; "and in the ancient days of Gondor they were not needed, for they had the Seven Stones." Pippin stirred uneasily.
Nevertheless, at time of writing man pages remain the single most important form of Unix documentation.
TeX
TeX (pronounced /teH/ with a rough h as though you are gargling) is a very capable typesetting program that, like the Emacs editor, originated outside the Unix culture but is now naturalized in it. It was created by noted computer scientist Donald Knuth when he became impatient with the quality of typography, and especially mathematical typesetting, that was available to him in the late 1970s.
TeX, like troff(1), is a markup-centered system. The ancient Greeks had two words for time: chronos (χρόνος) and kairos. While the former refers to chronological or sequential time, the latter signifies a proper or opportune time for action. TeX’s request language is rather more powerful than troff’s; among other things, it is better at handling images, page-positioning content precisely, and internationalization. TeX is particularly good at mathematical typesetting, and unsurpassed at basic typesetting tasks like kerning, line ﬁlling, and hyphenating. TeX has become the standard submission format for most mathematical journals. It is actually now maintained as open source by a working group of the the American Mathematical Society. It is also commonly used for scientiﬁc papers.
464
Chapter 18. Documentation
As with troff(1), human beings usually do not write large volumes of raw TeX macros by hand; they use macro packages and various auxiliary programs instead. One particular macro package, LaTeX, is almost universal, and most people who say they’re composing in TeX almost always actually mean they’re writing LaTeX. Like troff’s macro packages, a lot of its requests are semi-structural.
One important use of TeX that is normally hidden from the user is that other document-processing tools often generate LaTeX to be turned into PostScript, rather than attempting the much more difﬁcult job of generating PostScript themselves. The xmlto(1) front end that we discussed as a shell-programming case study in Chapter 14 uses this tactic; so does the XML-DocBook toolchain we’ll examine later in this chapter.
TeX has a wider application range than troff(1) and is in most ways a better design. It has the same fundamental problems as troff in an increasingly Web-centric world; its markup has strong ties to the presentation level, and automatically generating good Web pages from TeX sources is difﬁcult and fault-prone.
TeX is never used for Unix system documentation and only rarely used for application documentation; for those purposes, troff is sufﬁcient. But some software packages that originated in academia outside the Unix community have imported the use of TeX as a documentation master format; the Python language is one example. As we noted above, it is also heavily used for mathematical and scientiﬁc papers, and will probably dominate that niche for some years yet.
Texinfo
Texinfo is a documentation markup invented by the Free Software Foundation and used mainly for GNU project documentation — including the documentation for such essential tools as Emacs and the GNU Compiler Collection.
Texinfo was the ﬁrst markup system speciﬁcally designed to support both typeset output on paper and hypertext output for browsing. The hypertext format was not, however, HTML; it was a more primitive variety called ‘info’, originally designed to be browsed from within Emacs. On the print side, Texinfo turns into TeX macros and can go from there to PostScript.
The Texinfo tools can now generate HTML. But they don’t do a very good or complete job, and because a lot of Texinfo’s markup is at presentation level it is doubtful that they ever will. As of mid-2003, the Free Software Foundation is working on heuristic Texinfo to DocBook translation. Texinfo will probably remain a live format for some time.
465
Chapter 18. Documentation
POD
Plain Old Documentation is the markup system used by the maintainers of Perl. It generates manual pages, and has all the familiar problems of presentation-level markups, including trouble generating good HTML.
HTML
Since the World Wide Web entered the mainstream in the early 1990s, a small but increasing percentage of Unix projects have been writing their documentation directly in HTML. The problem with this approach is that it is difﬁcult to generate high-quality typeset output from HTML. There are particular problems with indexing as well; the information needed to generate indexes is not present in HTML.
DocBook
DocBook is an SGML and XML document type deﬁnition designed for large, complex technical documents. It is alone among the markup formats used in the Unix community in being purely structural. The xmlto(1) tool discussed in Chapter 14 supports rendering to HTML, XHTML, PostScript, PDF, Windows Help markup, and several less important formats.
Several major open-source projects (including the Linux Documentation Project, FreeBSD, Apache, Samba, GNOME, and KDE) already use DocBook as a master format. This book was written in XML-DocBook.
"Sleep again, and do not be afraid!" said Gandalf. "For you are not going like Frodo to Mordor, but to Minas Tirith, and there you will be as safe as you can be anywhere in these days. If Gondor falls, or the Ring is taken, then the Shire will be no refuge."

"You do not comfort me," said Pippin, but nonetheless sleep crept over him. The last thing that he remembered before he fell into deep dream was a glimpse of high white peaks, glimmering like floating isles above the clouds as they caught the light of the westering moon. He wondered where Frodo was, and if he was already in Mordor, or if he was dead; and he did not know that Frodo from far away looked on that same moon as it set beyond Gondor ere the coming of the day.

DocBook is a large topic. We’ll return to it after summing up the problems with the current state of Unix documentation.
The Present Chaos and a Possible Way Out
Unix documentation is, at present, a mess.
Between man, ms, mm, TeX, Texinfo, POD, HTML, and DocBook, the documentation master ﬁles on modern Unix systems are scattered across eight different markup formats. There is no uniform way to view all the rendered versions. They aren’t Web-accessible, and they aren’t cross-indexed.
Many people in the Unix community are aware that this is a problem. At time of writing most of the effort toward solving it has come from open-source developers, who are more actively interested
466
Chapter 18. Documentation
in competing for acceptance by nontechnical end users than developers for proprietary Unixes have been. Since 2000, practice has been moving toward use of XML-DocBook as a documentation interchange format.
The goal, which is within sight but will take a lot of effort to achieve, is to equip every Unix system with software that will act as a systemwide document registry. When system administrators install packages, one step will be to enter the package’s XML-DocBook documentation into the registry. It will then be rendered into a common HTML document tree and cross-linked to the documentation already present.
Early versions of the document-registry software are already working. The problem of forwardconverting documentation from the other formats into XML-DocBook is a large and messy one, but the conversion tools are falling into place. Other political and technical problems remain to be attacked, but are probably solvable. While there is not as of mid-2003 a communitywide consensus that the older formats have to be phased out, that seems the likeliest working out of events.
Accordingly, we’ll next take a very detailed look at DocBook and its toolchain. This description should be read as an introduction to XML under Unix, a pragmatic guide to practice and as a major case study. It’s a good example of how, in the context of the Unix community, cooperation between different project groups develops around shared standards.
DocBook
A great many major open-source projects are converging on DocBook as a standard format for their documentation. The advocates of XML-based markup seem to have won the theoretical argument against presentation-level and for structural-level markup, and an effective XML-DocBook toolchain is available in open source.
Nevertheless, a lot of confusion still surrounds DocBook and the programs that support it. Its devotees speak an argot that is dense and forbidding even by computer-science standards, slinging around acronyms that have no obvious relationship to the things you need to do to write markup and make HTML or PostScript from it. XML standards and technical papers are notoriously obscure. In the rest of this section, we’ll try to dispel the fog of jargon.
Document Type Deﬁnitions
(Note: to keep the explanation simple, most of this section tells some lies, mainly by omitting a lot of history. Truthfulness will be fully restored in a following section.)
"In the realm of Gondor," the wizard answered. "The land of Anórien is still passing by."

There was a silence again for a while. Then, "What is that?" cried Pippin suddenly, clutching at Gandalf"s cloak. "Look! Fire, red fire! Are there dragons in this land? Look, there is another!"

For answer Gandalf cried aloud to his horse. "On, Shadowfax! We must hasten. Time is short. See! The beacons of Gondor are alight, calling for aid. War is kindled. See, there is the fire on Amon Dîn, and flame on Eilenach; and there they go speeding west: Nardol, Erelas, Min-Rimmon, Calenhad, and the Halifirien on the borders of Rohan."

But Shadowfax paused in his stride, slowing to a walk, and then he lifted up his head and neighed. And out of the darkness the answering neigh of other horses came; and presently the thudding of hoofs was heard, and three riders swept up and passed like flying ghosts in the moon and vanished into the West. Then Shadowfax gathered himself together and sprang away, and the night flowed over him like a roaring wind.
467
Chapter 18. Documentation
DocBook is a structural-level markup language. Speciﬁcally, it is a dialect of XML. A DocBook document is a piece of XML that uses XML tags for structural markup.
For a document formatter to apply a stylesheet to your document and make it look good, it needs to know things about the overall structure of your document. For example, in order to physically format chapter headers properly, it needs to know that a book manuscript normally consists of front matter, a sequence of chapters, and back matter. In order for it to know this sort of thing, you need to give it a Document Type Deﬁnition or DTD. The DTD tells your formatter what sorts of elements can be in the document structure, and in what order they can appear.
What we mean by calling DocBook a ‘dialect’ of XML is actually that DocBook is a DTD — a rather large DTD, with somewhere around 400 tags in it.152
Lurking behind DocBook is a kind of program called a validating parser. When you format a DocBook document, the ﬁrst step is to pass it through a validating parser (the front end of the DocBook formatter). This program checks your document against the DocBook DTD to make sure you aren’t breaking any of the DTD’s structural rules (otherwise the back end of the formatter, the part that applies your stylesheet, might become quite confused).
The validating parser will either throw an error, giving you messages about places where the document structure is broken, or translate the document into a stream of XML elements and text that the parser back end combines with the information in your stylesheet to produce formatted output.`

module.exports = something
