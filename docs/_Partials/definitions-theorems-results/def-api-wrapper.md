[From Quora](https://www.quora.com/What-exactly-is-an-API-wrapper-And-how-does-it-differ-from-just-an-API): An API-wrapper typically takes an API in one form and transforms it into another.

An example might be useful:

The main application interface to **Flickr** (the image hosting service) is a REST api (is http GET or POST calls). There is a library called **pyFlickr** which is a API-wrapper &#8212; it provides a Pythonic interface to Flickr &#8212; classes, methods, iterators using the REST API under the skin. It keeps all of the REST api methods intact and available, but you call them using Python function calls and wrappings.

Sometimes you will see the term **binding**, as in a Python **binding** for xyz; essentially this is different form of API-wrapper. Here the wrapper transforms an API designed for one programming language and provides functionality in a second language to call the original API. An example here is **pyGTK**. The original **gtk** api is written a a C library. **pyGTK** is called a Python **binding** for **gtk** as it allows a Python program to call the **gtk** API written in C.