# Money-count$
This repository is a responsive webpage to keep track of my kids performed tasks for each week. The front page displays the users, and when you click on a user, you are redirected to a dynamic page (based on the users slug), where you can see the weekly lists of performed tasks that is stored in Sanity. There is a dropdown menu that allows you to choose whatever weekly list you want to display. The weekly list of the current week is open by default. 

If the kids have performed any tasks for the current week they can add the tasks to the list by clicking on the button with the given task. 

A function calculates the total earnings for each week, and the kids can see if the earnings has been paid or not, based on the paid-boolean in Sanity studio.

The webpage is Norwegian as it is made for my kids to use, but all the code and comments are written in English.

## MVP
The MVP is a 'mobile-first' application where the kids can see an overview of the performed tasks for each week, and how much money they have earned. This information will be created and stored in Sanity. 

## Deployment
The project is deployed on [Netlify](https://money-counts.netlify.app/).

## Links
The source code can be found on [Github](https://github.com/camillamn/money-counts).
The project's roadmap is made and followed with the use of [GitHub projects](https://github.com/users/camillamn/projects/8).
CMS is made in [Sanity](https://money-counts.sanity.studio/).

## Built with
- HTML
- CSS
- JavaScript
- Sanity

## Computer modeling
The computer modeling is made with [dbdiagram](https://dbdiagram.io/d/64422a836b31947051f5d1c4).


## Further plan
My plan is to develope the application further so that each kid have their own page, created based on slugs, and that they can add tasks to the weekly list by choosing from a list of tasks. They should also have the possibility to see what they have done and earned in the previous weeks, and if the pocket money have been paid or not. I would like to have a separate page for the admin user to see all the weekly lists sorted by user and a checkbox to check when the weekly earnings has been paid.