import * as React from 'react';
import type {Story, Meta} from '@storybook/react';
import {SyntaxHighlighter, SyntaxHighlighterTheme, SnippetLanguage} from '../src';
/*
import {styled, css} from '@twilio-paste/styling-library';

const Wrapper = styled.div(css({
  ':scrollbar': {
    color: ''
  }
}))
*/

export const Simple: Story = () => {
  return (
    <>
      <SyntaxHighlighter language={SnippetLanguage.JAVASCRIPT} style={SyntaxHighlighterTheme}>
        {`(num) => num + 1`}
      </SyntaxHighlighter>
      <SyntaxHighlighter language={SnippetLanguage.BASH} style={SyntaxHighlighterTheme}>
        {`#! usr/bin/bash
echo "Hello World"`}
      </SyntaxHighlighter>
      <SyntaxHighlighter language={SnippetLanguage.C} style={SyntaxHighlighterTheme}>
        {`#include <stdio.h>
int main() {
    char s[] = "Programming is fun";
    int i;

    for (i = 0; s[i] != '\0'; ++i);

    printf("Length of the string: %d", i);
    return 0;
}
`}
      </SyntaxHighlighter>
      <SyntaxHighlighter language={SnippetLanguage.CSHARP} style={SyntaxHighlighterTheme}>
        {`using System;

namespace HelloWorld
{
  class Program
  {
    static void Main(string[] args)
    {
      Console.WriteLine("Hello World!");
    }
  }
}`}
      </SyntaxHighlighter>
      <SyntaxHighlighter language={SnippetLanguage.GO} style={SyntaxHighlighterTheme}>
        {`func main() {
    r := rect{width: 10, height: 5}

    fmt.Println("area: ", r.area())
    fmt.Println("perim:", r.perim())

    rp := &r
    fmt.Println("area: ", rp.area())
    fmt.Println("perim:", rp.perim())
}`}
      </SyntaxHighlighter>
      <SyntaxHighlighter language={SnippetLanguage.GROOVY} style={SyntaxHighlighterTheme}>
        {`/**
 * A Class description
 */
class Person {
    /** the name of the person */
    String name

    /**
     * Creates a greeting method for a certain person.
     *
     * @param otherPerson the person to greet
     * @return a greeting message
     */
    String greet(String otherPerson) {
       "Hello \${otherPerson}"
    }
}`}
      </SyntaxHighlighter>
      <SyntaxHighlighter language={SnippetLanguage.JAVA} style={SyntaxHighlighterTheme}>
        {`java.util.Date utilDate = new java.util.Date();
java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());`}
      </SyntaxHighlighter>
      <SyntaxHighlighter language={SnippetLanguage.JSON} style={SyntaxHighlighterTheme} showLineNumbers wrapLongLines>
        {`{
    "glossary": {
        "title": "example glossary",
		"GlossDiv": {
            "title": "S",
			"GlossList": {
                "GlossEntry": {
                    "ID": "SGML",
					"SortAs": "SGML",
					"GlossTerm": "Standard Generalized Markup Language",
					"Acronym": "SGML",
					"Abbrev": "ISO 8879:1986",
					"GlossDef": {
                        "para": "A meta-markup language, used to create markup languages such as DocBook.",
						"GlossSeeAlso": ["GML", "XML"]
                    },
					"GlossSee": "markup"
                }
            }
        }
    }
}`}
      </SyntaxHighlighter>
      <SyntaxHighlighter language={SnippetLanguage.PHP} style={SyntaxHighlighterTheme}>
        {`<?php
ECHO "Hello!<br>";
echo "Welcome to Developer News<br>";
EcHo "Enjoy all of the ad-free articles<br>";
?>`}
      </SyntaxHighlighter>
      <SyntaxHighlighter language={SnippetLanguage.PYTHON} style={SyntaxHighlighterTheme}>
        {`a = "Hello, World!"
print(a.replace("H", "J"))
`}
      </SyntaxHighlighter>
      <SyntaxHighlighter language={SnippetLanguage.RUBY} style={SyntaxHighlighterTheme}>
        {`#!/usr/bin/ruby

# Import the library.
require 'tk'

# Root window.
root = TkRoot.new  {
  title 'Push Me'
  background '#111188'
}

# Add a label to the root window.
lab = TkLabel.new(root) {
  text "Hey there,\nPush a button!"
  background '#3333AA'
  foreground '#CCCCFF'
}`}
      </SyntaxHighlighter>
      <SyntaxHighlighter language={SnippetLanguage.SHELL} style={SyntaxHighlighterTheme}>
        {`$ curl -G https://api.twilio.com/2010-04-01/Accounts -u '[YOUR ACCOUNT SID]:[YOUR AUTH TOKEN]'`}
      </SyntaxHighlighter>
      <SyntaxHighlighter language="shell-session" style={SyntaxHighlighterTheme}>
        {`$ curl -G https://api.twilio.com/2010-04-01/Accounts -u '[YOUR ACCOUNT SID]:[YOUR AUTH TOKEN]'`}
      </SyntaxHighlighter>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default {
  title: 'Libraries/syntax-highlighter',
  parameters: {},
} as Meta;
