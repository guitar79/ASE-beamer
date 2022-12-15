\ProvidesClass{gshs_beamer_class}
\LoadClass[pdftex, aspectratio=169]{beamer}
\usetheme{Berkeley}

\usepackage{ifthen}
\usepackage{xcolor}
\usepackage{amssymb,amsmath,graphicx}
\usepackage{etoolbox}
\usepackage[hangul]{kotex}
\usepackage{tikz}
\usepackage{listings}
\usepackage[margin=10pt,font=small,labelfont=bf]{caption}
\usepackage{subcaption}
\usepackage{bookmark}
\usepackage{multirow}

\usepackage{hyperref}
\usepackage[
			type={CC},
			modifier={by-nc-sa},
			version={4.0},
			]{doclicense}


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% LaTeX Overlay Generator - Annotated Figures v0.0.1
% Created with http://ff.cx/latex-overlay-generator/
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%\annotatedFigureBoxCustom{bottom-left}{top-right}{label}{label-position}{box-color}{label-color}{border-color}{text-color}
\newcommand*\annotatedFigureBoxCustom[8]{\draw[#5,thick,rounded corners] (#1) rectangle (#2);\node at (#4) [fill=#6,thick,shape=circle,draw=#7,inner sep=2pt,font=\sffamily,text=#8] {\textbf{#3}};}
%\annotatedFigureBox{bottom-left}{top-right}{label}{label-position}
\newcommand*\annotatedFigureBox[4]{\annotatedFigureBoxCustom{#1}{#2}{#3}{#4}{white}{white}{black}{black}}
\newcommand*\annotatedFigureText[4]{\node[draw=none, anchor=south west, text=#2, inner sep=0, text width=#3\linewidth,font=\sffamily] at (#1){#4};}
\newenvironment {annotatedFigure}[1]{\centering\begin{tikzpicture}
		\node[anchor=south west,inner sep=0] (image) at (0,0) { #1};\begin{scope}[x={(image.south east)},y={(image.north west)}]}{\end{scope}\end{tikzpicture}}
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


%\usepackage{onimage}

%\usecounter{counter}
%
%% Color Setting %%

\definecolor{Grey}{rgb}{0.6,0.6,0.6}

\definecolor{GSHSred}{RGB}{105,0,0} %main color
\definecolor{GSHSRED}{RGB}{80,0,0} %sub color: toc, block (fg)
\definecolor{gshsred}{RGB}{240,210,170} %light color: maybe no use

\definecolor{GSHSblue}{RGB}{0,0,105}
\definecolor{GSHSBLUE}{RGB}{0,0,80}
\definecolor{gshsblue}{RGB}{210,210,240}

\definecolor{GSHSgreen}{RGB}{0,105,0}
\definecolor{GSHSGREEN}{RGB}{0,80,0}
\definecolor{gshsgreen}{RGB}{210,240,210}

\newcommand\themecolor[1]{%
	\ifthenelse{\equal{#1}{red}}{
	\setbeamercolor{title}{bg=white,fg=GSHSred}
	\setbeamercolor{author}{fg=GSHSred}
	\setbeamercolor{institute}{fg=GSHSred}
	\setbeamercolor{date}{fg=GSHSred}
	\setbeamercolor{logo}{bg=GSHSred}
	\setbeamercolor{sidebar}{bg=GSHSred}
	\setbeamercolor{frametitle}{bg=white,fg=GSHSred}
	\setbeamercolor{section in sidebar}{use=sidebar,bg=white,fg=sidebar.bg}
	\setbeamercolor{subsection in sidebar}{parent=section in sidebar}
	\setbeamercolor{subsubsection in sidebar}{parent=subsection in sidebar}
	\setbeamercolor{section in toc}{bg=white,fg=GSHSRED}
	\setbeamercolor{item}{fg=GSHSred}
	\setbeamercolor{block title}{bg=GSHSRED,fg=white}
	\setbeamercolor{subsection in toc}{fg=GSHSRED}
	\setbeamercolor{block body}{bg=black!7,fg=black}
	%\setbeamercolor{block body}{bg=black!7}
	\logo{\includegraphics[width=8mm]{./logo/gshs_red.png}}
}{}%
\ifthenelse{\equal{#1}{blue}}{
	\setbeamercolor{title}{bg=white,fg=GSHSblue}
	\setbeamercolor{author}{fg=GSHSblue}
	\setbeamercolor{institute}{fg=GSHSblue}
	\setbeamercolor{date}{fg=GSHSblue}
	\setbeamercolor{logo}{bg=GSHSblue}
	\setbeamercolor{sidebar}{bg=GSHSblue}
	\setbeamercolor{frametitle}{bg=white,fg=GSHSblue}
	\setbeamercolor{section in sidebar}{use=sidebar,bg=white,fg=sidebar.bg}
	\setbeamercolor{subsection in sidebar}{parent=section in sidebar}
	\setbeamercolor{subsubsection in sidebar}{parent=subsection in sidebar}
	\setbeamercolor{section in toc}{bg=white,fg=GSHSBLUE}
	\setbeamercolor{item}{fg=GSHSblue}
	\setbeamercolor{block title}{bg=GSHSBLUE,fg=yellow}
	\setbeamercolor{subsection in toc}{fg=GSHSBLUE}
	\setbeamercolor{block body}{bg=black!7,fg=black}
	\logo{\includegraphics[width=8mm]{./logo/gshs_blue.png}}
}{}%
\ifthenelse{\equal{#1}{green}}{
	\setbeamercolor{title}{bg=white,fg=GSHSgreen}
	\setbeamercolor{author}{fg=GSHSgreen}
	\setbeamercolor{institute}{fg=GSHSgreen}
	\setbeamercolor{date}{fg=GSHSgreen}
	\setbeamercolor{logo}{bg=GSHSgreen}
	\setbeamercolor{sidebar}{bg=GSHSgreen}
	\setbeamercolor{frametitle}{bg=white,fg=GSHSgreen}
	\setbeamercolor{section in sidebar}{use=sidebar,bg=white,fg=sidebar.bg}
	\setbeamercolor{subsection in sidebar}{parent=section in sidebar}
	\setbeamercolor{subsubsection in sidebar}{parent=subsection in sidebar}
	\setbeamercolor{section in toc}{bg=white,fg=GSHSGREEN}
	\setbeamercolor{item}{fg=GSHSgreen}
	\setbeamercolor{block title}{bg=GSHSGREEN,fg=white}
	\setbeamercolor{subsection in toc}{fg=GSHSGREEN}
	\setbeamercolor{block body}{bg=black!7,fg=black}
	\logo{\includegraphics[width=8mm]{./logo/gshs_green.png}}
}{}%
}

\AtBeginEnvironment{qqq}{%
	\setbeamercolor{block title}{fg=white,bg=blue!50!black}
	\setbeamercolor{block body}{bg=blue!10!white}
}


\AtBeginEnvironment{theorem}{%
  \setbeamercolor{block title}{fg=white,bg=blue!50!black}
  \setbeamercolor{block body}{bg=blue!10!white}
}

\AtBeginEnvironment{definition}{%
  \setbeamercolor{block title}{fg=white,bg=black}
  \setbeamercolor{block body}{bg=black!10!white}
}

%\AtBeginEnvironment{Q}{%
%	\setbeamercolor{block title}{fg=white,bg=black}
%	\setbeamercolor{block body}{bg=black!10!white}
%}

%% Equation Setting %%
\newcommand\equationfont[1]{%
	\ifthenelse{\equal{#1}{sf}}{
	\renewcommand\mathfamilydefault{\sfdefault}
}{}%
	\ifthenelse{\equal{#1}{rm}}{
	\renewcommand\mathfamilydefault{\rmdefault}
}{}%
}

%% Frametitle Setting %%
\setbeamerfont{frametitle}{series=\bfseries}

\setbeamertemplate{frametitle}
{ \vspace*{-12mm}  %original \vspace*{-10mm} 
  \leavevmode
  \hspace*{3pt}
  \begin{beamercolorbox}[wd=\paperwidth,ht=1ex,dp=1ex]{frametitle}
    \hspace*{7pt}\underline{\makebox[0.6\paperwidth][l]{
    \Large{\insertframetitle}}}
  \end{beamercolorbox}
}

%% Title Page Setting %%
\setbeamerfont{title}{series=\bfseries}
\setbeamertemplate{title page}{
  %% Background Logo
  \begin{picture}(0,0)%
    \setlength{\unitlength}{1cm}% default
    \protect\put(3.3,2.2){%
    \begin{picture}(6,6)(4,10)%
      \includegraphics[width=0.25\paperwidth]{./logo/gshs_logo_pdf.pdf}%
    \end{picture}%
    }%
  \end{picture}%
  \vfill
  \vspace*{10mm}
  \raggedleft
  %% Title
  \usebeamerfont{title}\usebeamercolor[fg]{title}\inserttitle\par
  %% Subtitle
  \ifx\insertsubtitle\@empty
  \else\usebeamerfont{subtitle}\usebeamercolor[fg]{subtitle}\insertsubtitle
  \fi

  \vskip 2mm
  %% Horizontal line
  \usebeamercolor[fg]{title}\hrule height 2pt\hfill
  \vskip 10mm
  %% Author
  \usebeamercolor[fg]{author}\usebeamerfont{author}\insertauthor
  \vskip 1cm
  %% Institute
  \usebeamercolor[fg]{institute}\usebeamerfont{institute}\insertinstitute
  \vskip 1cm
  %% Date
  \usebeamercolor[fg]{date}\usebeamerfont{date}\insertdate
  \vfill
}

%% itemize bullet setting %%
\setbeamertemplate{itemize items}[ball]
\setbeamertemplate{sections/subsections in toc}[ball]

%% block setting %%
\setbeamertemplate{blocks}[rounded][shadow=false]

%% Listing (Source Code) Setting %%
\lstset
{
    language=[LaTeX]TeX,
    breaklines=true,
    breakindent=0pt,
    basicstyle=\ttfamily\scriptsize,
    texcsstyle=*\color{GSHSred},
    keywordstyle=\color{blue},
    literate=
    *{\{}{{\textcolor{GSHSred}{\{}}}{1}
     {\}}{{\textcolor{GSHSred}{\}}}}{1}
     {\$}{{\textcolor{GSHSred}{\$}}}{1}
     {\#}{{\textcolor{GSHSred}{\#}}}{1},
    identifierstyle=\color{blue},
    commentstyle=\color{red!70},
}% end of lstset


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%% caption format %%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%\renewcommand{\figurename}{Fig.}
\captionsetup[figure]
{%
	font=tiny,labelsep=period,singlelinecheck=off,aboveskip=2pt,% 
	belowskip=2pt, margin=0pt,subrefformat=parens%
}

\captionsetup[table]
{%
	font=tiny,labelsep=period,singlelinecheck=off,aboveskip=2pt,% 
	belowskip=2pt,	margin=0pt%
}

%% No navigation bar %%
%\beamertemplatenavigationsymbolsempty


\newcommand{\ccpage}{
	\begin{tabular}{ll}
		\begin{minipage}[t]{0.35\textwidth}\	
			\begin{figure}[t]
				\includegraphics[trim=0 0 0 0, clip, page=1, width=0.8\textwidth]
				{\bookfile}
			\end{figure}
			{\scriptsize ISBN-13: 978-0321984623\\
			ISBN-10: 0321984625}
		\end{minipage}	
		&
		\begin{minipage}[t]{0.55\textwidth}
			\begin{itemize}
				\item 이 문서는 오른쪽의 교재를 이용하여 경기과학고등학교의 대기과학및실험 강좌 수업을 위해 제작되었습니다.
				\item 그림의 저작권은 원저작자에게 있으며, 이를 교재로 사용하는 수업을 하는 경우에 한하여 이용할 수 있습니다. 
			\end{itemize}
		\end{minipage}
	\end{tabular}
	\doclicenseThis
}


\ifxetex
%한글 사용 옵션
\RequirePackage{xetexko}
\setmainfont[Ligatures=TeX]{NanumMyeongjo}
\setmainhangulfont[BoldFont=*,BoldFeatures=FakeBold,%
ItalicFont=*,ItalicFeatures=FakeSlant]{NanumMyeongjo}

\disablecjksymbolspacing
\nonfrenchspacing
\else
\fi 