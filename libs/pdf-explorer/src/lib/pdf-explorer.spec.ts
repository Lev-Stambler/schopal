import { splitTextToParagraphs } from './pdf-explorer';

const sampleText = `‘unconventional’ quantum computers.
Perhaps the most obvious basis for an unconventional quantum computer is the use
of particles with non-Boltzmann statistics in a refime wherethese statistics play a key role
in the dynamics of the device. For example, Lloyd [16] has proposed the use of fermions
as the fundamental carriers of quantum information, so thata site or state occupied by a
fermion represents a 1 and an unoccupied site or state represents a 0. It is straightforward
to design a universal quantum computer using a conditional hopping dynamics on an array
of sites, in which a fermion hops from one site to another if only if other sites are occupied.
If the array is one-dimensional, then such a fermionic quantum computer is equivalent
to a conventional quantum computer via the well-known technique of bosonization. If the
array is two or more dimensional, however, a local operationinvolving fermions on the
lattice cannot be mocked up by a local operation on a conventional quantum computer,
which must explicitly keep track of the phases induced by Fermi statistics. As a result,
such a fermionic computer can perform certain operations more rapidly than a conventional
quantum computer. An obvious example of a problem that can besolved more rapidly on
a fermionic quantum computer is the problem of simulating a lattice fermionic system in
two or more dimensions. To get the antisymmetrization rightin second quantized form,
a conventional ‘Boltzmann’ quantum computer takes time proportional toTℓ
d−1
whereT
is the time over which the simulation is to take place,ℓis the length of the lattice and
dis the dimension, while a fermionic quantum computer takes time proportional toT.
(Here we assume that the computations for both conventionaland Fermionic quantum
computers can take advantage of the intrinsic parallelizability of such simulations: if the
computations are performed serially an additional factro ofℓ
d
is required for both types
of computer to update each site sequentially.)
As the lattice sizeℓand the dimensiondgrow large, the difference between the two
types of computer also grows large. Indeed, the problem of simulating fermions hopping
on a hypercube of dimensiondasd→ ∞is evidently exponentially harder on a con-
ventional quantum computer than a Fermionic quantum computer.  Since a variety of
difficult problems such as the travelling-salesman problem and data-base search problem
can be mapped to particles hopping on a hypercube, it is interesting to speculate whether
fermionic computers might provide an exponential speed-upon problems of interest in ad-
dition to quantum simulation. No such problems are currently known, however. Fermionic
computers could be realized in principle by manipulating the ways in which electrons and
3

holes hop from site to site on a semiconductor lattice (though problems of decoherence are
likely to be relatively severe for such systems).
It might also be possible to construct bosonic computers using photons, phonons, or
atoms in a Bose-Einstein condensate. Such systems can be highly coherent and support
nonlinear interactions: phonons and photons can interact in a nonlinear fshion via their
common nonlinear interaction with matter, and atoms in a Bose condensate can be made
to interact bia quantum electrodynamics (by introduction of a cavity) or by collisions. So
far, however, the feature of Bose condensates that makes them so interesting from the point
of view of physics — all particles in the same state — makes them less interesting from the
point of view of quantum computation. Many particles in the same state, which can be
manipulated coherently by a variety of techniques, explorethe same volume of Hilbert space
as a single particle in that state. As a result, it is unclear how such a bosonic system could
provide a speed-up over conventional quantum computation.More promising than Bose
condensates from the perspective of quantum computation and quantum communications,
is the use of cavity quantum electrodynamics to ‘dial up’ or synthesize arbitrary states
of the cavity field.  Such a use of bosonic states is important for the field of quantum
communications, which requires the ability to create and manipulate entangled states of
the electromagnetic field.
A third unconventional design for a quantum computer relieson ‘exotic’ statistics
that are neither fermionic nor bosonic. Kitaev has recentlyproposed a quantum computer
architecture based on ‘anyons,’ particles that when exchanged acquuire an arbitrary phase.
Examples of anyons include two-dimensional topological defects in lattice systems of spins
with various symmetries. Kitaev noted that such anyons could perform quantum logic via
Aharonov-Bohm type interactions [19]. Preskillet al.have shown explicitly how anyonic
systems could compute in principle [20], and Lloydet  al.have proposed methods of
realizing anyons using superconducting circuits (they could also in principle be constructed
using NMR quantum computers to mock up the anyonic dynamics in an effectively two-
dimensional space of spins) [21]. The advantage of using anyons for quantum computation
is that their nonlocal topological nature can make them intrinsically error-correcting and
virtually immune to the effects of noise and interference.
As the technologies of the microscale become better developed, more and more po-
tential designs for quantum computers, both conventional and unconventional, are likely
to arise. Additional technologies that could prove useful for the construction of quantum
4

logic devices include photonic crystals, optical hole-burning techniques, electron spin res-
onance, quantum dots, superconducting circuits in the quantum regime, etc. Since every
quantum degree of freedom can in principle participate in a computation one cannota
priorirule out the possibility of using currently hard to control degrees of freedom such as
quark and gluon in complex nuclei to process information. Needless to say, most if not all
of the designs inspired by these technologies are likely to fail. There is room for optimism
that some such quantum computer designs will prove practicable, however.
The preceding unconventional designs for quantum computers were based on existing,
experimentally confirmed physical phenomena (except in thecase of non-abelian anyons).
Let us now turn to designs based on speculative, hypothetical, and not yet verified phenom-
ena. (One of the most interesting of these phenomena is large-scale quantum computation
itself: can we create and systematically transform entangled states involving hundreds or
thousands of quantum variables?) A particularly powerful hypothesis from the point of
view of quantum computation is that of nonlinear quantum mechanics.
The conventional picture of quantum mechanics is that it is linear in the sense that the
superposition principle is obeyed exactly. (Of course, quantum systems can still exhibit
nonlinear interactions between degrees of freedom while continuing to obey the superpo-
sition principle.) Experiment confirms that the superposition principle is indeed obeyed
to a high degree of accuracy. Nonetheless, a number of scientists including Weinberg have
proposed nonlinear versions of quantum mechanics in which the superposition principle
is violated. Many of these proposals exhibit pathologies such as violations of the second
law of thermodynamics or the capacity for superluminal communication.  Despite such
theoretical difficulties, it is still possible that quantum mechanics does indeed possess a
small nonlinearity, even if it currently seems unlikely. Ifa nonlinear operation such as
that proposed by Weinberg can be incorporated in a quantum logic operation, then the
consequences are striking: NP-complete problems can be solved easily in polynomial time
[17]. Indeed, NP-oracle problems and all problems in #Pcan be solved in polynomial time
on such a nonlinear quantum computer.
A general proof of this result is given in [17], however, a simple argument for why
this is so can be seen as follows.  Suppose that it is possible to perform a non-unitary
operation on a single qubit that has a positive Lyapunov exponent over some region: i.e.,
somewhere on the unit sphere there exists a line of finite extent along which application of
the operation causes nearby points to move apart exponentially at a ratee
λ∆θ
proportional
5

to their original angular separationδθ. Now consider a functionf(x) fromNbits to one
bit. We wish to determine whether or not there exists anxsuch thatf(x) = 1, and if
so, how many suchx’s there are. Using the nonlinear operation with positive Lyapunov
exponent, it is straightforward to construct a mapping leaves a point on the exponentially
expanding line (call this point|0i) fixed if their are no solutions to the equationf(x) = 1,
and that maps the point to a nearby point cos(n/2
N
)|0i+ sin(n/2
N
)|1ialong the line
if there are exactlynsolutions to the equationf(x) = 1. Repeated application of the
nonlinear map can be used to drive the points apart at an exponentional rate: eventually,
at a time determined by the number of qubitsN, the number of solutionsn, and the rate
of spreadingλ, the two points will become macroscopically distinguishable, allowing one
to determine whether or not there is a solution and if there is, how many solutions there
are. The mapfneed only be applied once, and the amount of time it takes to reveal the
number of solutions is proportional toN.
The fact that nonlinear quantum mechanics allows the straightforward solution of
NP-complete and #Pproblems should probably be regarded as yet another strike against
nonlinear quantum mechanics. Whether or not quantum mechanics is linear is a question
to be resolved experimentally, however.  In the unlikely event that quantum mechanics
does turn out to be nonlinear, all our problems may be solved.
Finally, let us turn our attention to hypothetical quantum Theories of Everything,
such as string theory. Such a theory must clearly support quantum computation since it
supports cavity quantum electrodynamics and nuclear magnetic resonance. The obvious
question to ask is then, does a Theory of Everything need to support anythingmorethan
quantum computation? So far as experimental evidence is concerned the answer to this
question is apparently No: we have no evident reason to doubtthat the universe is at
bottom anything more than a giant, parallel, quantum information processing machine,
and that the phenomena that we observe and attempt to characterize are simply outputs
of this machine’s ongoing computation. Of course, just how the universe is carrying out
this computation is likely to remain a question of great interest for some time.
To summarize: Computers are physical systems, and what theycan do in practice and
in principle is circumscribed by the laws of physics. The laws of physics in turn permit a
wide variety of quantum computational devices including some based on nonconventional
statistics and exotic effects. Modifications made to the lawsof physics have the consequence
that what can be computed in practice and in principle changes. A particularly intriguing
6

variation on conventional physics is nonlinear quantum mechanics which, if true, would
allow hard problems to be solved easily.
7

References`;

describe('pdfExplorer', () => {
  it('should work to return paragraphs', async () => {
    const paragraphs = splitTextToParagraphs(sampleText);
    expect(paragraphs.length).toBe(14);
    expect(paragraphs[0].length).toBeGreaterThanOrEqual(20);
  });
});
